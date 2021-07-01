<script lang="typescript">
    import { onMount, tick } from "svelte";
    import { push } from "svelte-spa-router";
    import FilePreview from "./FilePreview.svelte";
    import Button from "./Button.svelte";
    import Spinner from "./Spinner.svelte";
    import { loadedFile } from "./stores";
    import { MediaType } from "./types";
    import { convertFile as runFFmpeg } from "./utils";

    
    let media: MediaType = MediaType.VIDEO ;
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
    let width: number = -1;
    let height: number = -1;
    let fps: number;
    let resolution: number;

    let formatOptions = [
        { value: "mp4", text: "MP4" },
        { value: "webm", text: "WEBM" },
        { value: "mov", text: "MOV" },
        { value: "mp3", text: "MP3 (Áudio apenas)" },
    ];

    let resolutions = [
        { value:144, text: "144p" },
        { value:240, text: "240p" },
        { value:360, text: "360p" },
        { value:480, text: "480p" },
        { value:720, text: "720p" },
        { value:1080, text: "1080p" },
    ];


    $: {
        if(width > 0 && height > 0 ){
            resolutions = resolutions.filter(({value})=> {
                return height >= value;
            });
            console.log(resolutions);
        }
    }

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
            { resolution, fps } 
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
    <Spinner text="Convertendo vídeo"/>
{/if}

<main class="d-flex flex-column text-center align-items-center pt-3 justify-content-start container-fluid h-100">
    {#if !conversionDone}
        <header class="pt-3">
            <p class="h2">Altere os parâmetros de conversão</p>
        </header>
        <div class="content d-flex align-items-center w-100">
            <aside class="w-50 d-flex cols">
                <FilePreview bind:elementWidth={width} bind:elementHeight={height} bind:this={preview} height="100%" width="100%" type={media}/>
            </aside>
            <aside class="w-50 cols d-flex text-start flex-column">
                <div class="mb-3">
                    <label for="res" class="form-label">Resolução</label>
                    <select bind:value={resolution} class="form-select" aria-label="Default select example">
                        {#each resolutions as option}
                            <option value="{option.value}">{option.text}</option>
                        {/each}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="fps" class="form-label">Taxa de quadros</label>
                    <select bind:value={fps} class="form-select" aria-label="Default select example">
                        <option value="15"> 15 FPS </option>
                        <option value="30" selected> 30 FPS </option>
                        <option value="60"> 60 FP</option>
                    </select>
                </div>
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

    select:focus, select:active, input:active{
        outline: var(--color-accent);
    }
</style>
