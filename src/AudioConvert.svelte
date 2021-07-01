<script lang="typescript">
    import { onMount, tick } from "svelte";
    import { push } from "svelte-spa-router";
    import FilePreview from "./FilePreview.svelte";
    import Button from "./Button.svelte";
    import Spinner from "./Spinner.svelte";
    import { loadedFile } from "./stores";
    import { MediaType } from "./types";
    import { convertFile as runFFmpeg } from "./utils";

    
    let media: MediaType = MediaType.AUDIO ;
    let preview: FilePreview;

    let {file, mediaType, mediaProps } = $loadedFile;

    onMount(async() => {
        if(file === null || mediaType === MediaType.EMPTY){
            push("/");
            return;
        }
        preview.setFile(file as any);
    });

    //File state
    let loading = false;
    let conversionDone = false;

    let conversionText: string;
    let downloadLink: HTMLAnchorElement;

    let outputType: string;

    let formatOptions = [
        { value: "mp3", text: "MP3" },
        { value: "flac", text: "FLAC" },
    ];


    const resetConvert = () => {
        conversionDone = false;
        push("/");
    };

    const convertFile = async () => {
        if(!outputType) return;
        loading = true;
        conversionDone = false;
        const [convertedFile, outname] = await runFFmpeg(
            file as File, 
            media, 
            outputType, 
            {} 
        );
        conversionDone = true;
        await tick();
        loading = false;
        conversionText = (
            "Conversão terminada. Novo tamanho: " 
            + (convertedFile.size/1024/1024).toFixed(2) + "MB"
        );
        downloadLink.href = URL.createObjectURL(convertedFile);
        downloadLink.download = outname;
    }
</script>

{#if loading}
    <Spinner text="Convertendo áudio"/>
{/if}

<main class="d-flex flex-column text-center align-items-center pt-3 justify-content-start container-fluid h-100">
    {#if !conversionDone}
        <header class="pt-3">
            <p class="h2">Altere os parâmetros de conversão</p>
        </header>
        <div class="content d-flex align-items-center w-100">
            <aside class="w-50 d-flex cols">
                <FilePreview bind:this={preview} height="100%" width="100%" type={media}/>
            </aside>
            <aside class="w-50 cols d-flex text-start flex-column">
                <div class="mb-4">
                    <label for="altura" class="form-label">Formato de saída</label>
                    <select bind:value={outputType} class="form-select" aria-label="Default select example">
                        <option selected>Escolha um formato de saída</option>
                        {#each formatOptions as option}
                            <option value="{option.value}">{option.text}</option>
                        {/each}
                    </select>
                </div>
                <Button on:click={convertFile} width="60%">Converter</Button>
            </aside>
        </div>
    {:else}
        <div class="d-flex text-center flex-column justify-content-center align-items-center w-100 h-100">
            <header class="pt-3">
                <p class="h2">Ficheiro convertido!</p>
            </header>
            <p class="my-2">{conversionText}</p>
            <div class="d-flex justify-content-center align-items center mt-2">
                <a bind:this={downloadLink} href=""  class="btn me-2 btn-success" download="">Baixar ficheiro</a>
                <button on:click={resetConvert} type="button" class="btn btn-primary">Converter outro ficheiro</button>
            </div>
        </div>
    {/if}
</main>

<style>
    main{
        color: white;
        background-color: var(--color-bg);
    }

    .content{
        flex-grow: 1;
    }

    select{
        width:60%;
    }

    select:focus, select:active {
        outline: var(--color-accent);
    }
</style>
