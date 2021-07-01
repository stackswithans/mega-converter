<script lang="typescript">
    import FileInput from "./FileInput.svelte";
    import FilePreview from "./FilePreview.svelte";

    let preview: FilePreview;
    let file: File

    type media_types = "audio" | "image" | "video";
    export let params: {type: media_types};
    const types = {
        "audio": "um ficheiro áudio",
        "video": "um vídeo ",
        "image": "uma imagem",
    }

    $:{
        if(file !== undefined){
            preview.setFile(file);
        }
    }


</script>



<main class="d-flex flex-column text-center align-items-center pt-3 justify-content-start container-fluid h-100">
    <header class="pt-3">
        <p class="h2">Selecione {types[params.type]}</p>
    </header>
    <div class="content d-flex align-items-center w-100">
        <aside class="w-50 d-flex cols">
            <FilePreview bind:this={preview} height="100%" width="100%" type={params.type}/>
        </aside>
        <aside class="w-50 cols">
            <FileInput bind:file={file} type="{params.type}"/>
        </aside>
    </div>
</main>




<style>
    main{
        color: white;
        background-color: var(--color-bg);
    }

    .content{
        flex-grow: 1;
    }
</style>
