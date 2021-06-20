<script lang="typescript">
    import { tick } from "svelte";
    import { convertFile as runFFmpeg } from "./utils";
    import FileInput from "./FileInput.svelte";
    import Spinner from "./Spinner.svelte";

    //File type
    export let emptyLabel: string;
    export let selectLabel: string = "Formato";
    export let fileType: string;
    export let formatOptions: Array<{value: string, text: string}>;

    //File state
    let loading = false;
    let conversionDone = false;

    let outputType: string;
    let file: File;
    let fileInput: FileInput;
    let conversionResult: HTMLParagraphElement;
    let downloadLink: HTMLAnchorElement;
    let formatSelector: HTMLSelectElement;
    let convertButton: HTMLButtonElement;

    const convertFile = async () => {
        if(!outputType) return;
        loading = true;
        conversionDone = false;
        const [convertedFile, outname] = await runFFmpeg(file, outputType);
        conversionDone = true;
        await tick();
        loading = false;
        conversionResult.innerText = (
            "Conversão terminada. Novo tamanho: " 
            + (convertedFile.size/1024/1024).toFixed(2) + "MB"
        );

        downloadLink.href = URL.createObjectURL(convertedFile);
        downloadLink.download = outname;
        downloadLink.classList.remove("disabled");
    }


    const activateForm = () => {
        convertButton.disabled = false;
        formatSelector.disabled = false;
    };

    const resetConvert = async () => {
        conversionDone = false;
        await tick();
        convertButton.disabled = true;
        formatSelector.disabled = true;
        outputType = "0";
        await tick();
        fileInput.reset();
    };
</script>

{#if loading}
    <Spinner/>
{/if}

{#if !conversionDone}
    <div class="d-flex justify-content-evenly w-100">
        <aside class="d-flex justify-content-start w-50 flex-column">
            <FileInput {emptyLabel} type={fileType} bind:this={fileInput} on:change={activateForm} bind:file={file}/>
        </aside>
        <aside class="d-flex justify-content-center w-50 flex-column">
            <div class="mb-3">
                <label for="output-format" class="form-label">{selectLabel}</label>
                <select bind:this={formatSelector} bind:value={outputType} id="output-format" class="form-select" aria-label="Default select example" disabled>
                    <option  value="" selected>Selecione um formato de saída para o vídeo</option>
                    {#each formatOptions as option}
                        <option value="{option.value}">{option.text}</option>
                    {/each}
                </select>
            </div>
            <div class="d-flex flex-column align-items-start w-100">
                <button bind:this={convertButton} on:click={convertFile} type="button" class="btn btn-primary" disabled>Converter</button>
            </div>
        </aside>
    </div>
{:else}
    <div class="d-flex text-center flex-column align items center">
        <p bind:this={conversionResult} class="my-2"></p>
        <div class="d-flex justify-content-center align-items center mt-2">
            <a bind:this={downloadLink} href=""  class="btn me-2 btn-success" download="">Baixar ficheiro</a>
            <button on:click={resetConvert} type="button" class="btn btn-primary">Converter outro ficheiro</button>
        </div>
    </div>
{/if}


<style>
    select{
        width: fit-content;
    }
</style>
