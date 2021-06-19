<script lang="typescript">
    import Tab from "./Tab.svelte";
    import FileInput from "./FileInput.svelte";
    let video: HTMLInputElement;
</script>

<Tab>
    <div slot="preview">
        <FileInput/>
    </div>
    <div slot="controls">
        <div class="mb-3">
            <label for="output-format" class="form-label">Formato</label>
            <select id="output-format" class="form-select" aria-label="Default select example">
                <option selected>Selecione um formato de saída para o vídeo</option>
                <option value="1">MP4</option>
                <option value="2">AAC</option>
                <option value="3">WEBM</option>
                <option value="3">AVI</option>
            </select>
        </div>
        <button class="btn btn-primary">Converter</button>
    </div>
</Tab>



<style>
    select{
        width: fit-content;

    }

</style>
