<script lang="typescript">
    import Tab from "./Tab.svelte";
    import { convertFile } from "./utils";
    import FileInput from "./FileInput.svelte";

    let outputType: string;
    let file: File;
    let outputPreview: HTMLImageElement;

    const convertVideo = async () => {
        if(file === undefined) return;
        const convertedFile = await convertFile(file, outputType);
        outputPreview.src = URL.createObjectURL(convertedFile);
    }
</script>

<Tab>
    <div slot="preview">
        <FileInput bind:file={file}/>
    </div>
    <div slot="controls">
        <div class="mb-3">
            <label for="output-format" class="form-label">Formato</label>
            <select bind:value={outputType} id="output-format" class="form-select" aria-label="Default select example">
                <option selected>Selecione um formato de saída para o vídeo</option>
                <option  value="mp4">MP4</option>
                <option  value="webm">WebM</option>
                <option value="gif">GIF</option>
            </select>
        </div>
        <button on:click={convertVideo} type="button" class="btn btn-primary">Converter</button>
        <img bind:this={outputPreview} src="" alt="">
    </div>
</Tab>



<style>
    select{
        width: fit-content;
    }

    img{
        max-width: 10.5rem;
    }
</style>
