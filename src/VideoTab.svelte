<script lang="typescript">
    import Tab from "./Tab.svelte";
    import { convertFile } from "./utils";
    import FileInput from "./FileInput.svelte";
    import Spinner from "./Spinner.svelte";

    let outputType: string;
    let file: File;
    let outputPreview: HTMLImageElement;
    let conversionResult: HTMLParagraphElement;
    let downloadLink: HTMLAnchorElement;
    let formatSelector: HTMLSelectElement;
    let convertButton: HTMLButtonElement;

    const convertVideo = async () => {
        const [convertedFile, outname] = await convertFile(file, outputType);
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
</script>

<Spinner/>

<Tab>
    <div slot="preview">
        <FileInput on:change={activateForm} bind:file={file}/>
    </div>
    <div slot="controls">
        <div class="mb-3">
            <label for="output-format" class="form-label">Formato</label>
            <select bind:this={formatSelector} bind:value={outputType} id="output-format" class="form-select" aria-label="Default select example" disabled>
                <option selected>Selecione um formato de saída para o vídeo</option>
                <option  value="mp4">MP4</option>
                <option  value="mp3">MP3</option>
                <option  value="webm">WEBM</option>
                <option  value="mov">MOV</option>
            </select>
        </div>
        <p bind:this={conversionResult} class="my-2"></p>
        <div class="d-flex flex-column align-items-start w-100">
            <button bind:this={convertButton} on:click={convertVideo} type="button" class="btn btn-primary" disabled>Converter</button>
            <img bind:this={outputPreview} src="" alt="">
        </div>
    </div>
    <a bind:this={downloadLink} href=""  class="btn mt-2 btn-success disabled" download="">Baixar ficheiro</a>
</Tab>



<style>
    select{
        width: fit-content;
    }

    img{
        max-width: 10.5rem;
    }
</style>
