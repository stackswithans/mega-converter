<script lang="typescript">
    import { tick } from "svelte";
    import Tab from "./Tab.svelte";
    import { convertFile } from "./utils";
    import FileInput from "./FileInput.svelte";
    import Spinner from "./Spinner.svelte";

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

    const convertVideo = async () => {
        loading = true;
        conversionDone = false;
        const [convertedFile, outname] = await convertFile(file, outputType);
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
    <Tab>
        <div slot="preview">
            <FileInput bind:this={fileInput} on:change={activateForm} bind:file={file}/>
        </div>
        <div slot="controls">
            <div class="mb-3">
                <label for="output-format" class="form-label">Formato</label>
                <select bind:this={formatSelector} bind:value={outputType} id="output-format" class="form-select" aria-label="Default select example" disabled>
                    <option value="0" selected>Selecione um formato de saída para o vídeo</option>
                    <option  value="mp4">MP4</option>
                    <option  value="mp3">MP3 (Áudio apenas)</option>
                    <option  value="webm">WEBM</option>
                    <option  value="mov">MOV</option>
                </select>
            </div>
            <div class="d-flex flex-column align-items-start w-100">
                <button bind:this={convertButton} on:click={convertVideo} type="button" class="btn btn-primary" disabled>Converter</button>
            </div>
        </div>
    </Tab>
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
