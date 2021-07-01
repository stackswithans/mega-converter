<script lang="typescript">
    import FileInput from "./FileInput.svelte";
    import FilePreview from "./FilePreview.svelte";
    import { loadedFile } from "./stores";
    import { MediaType } from "./types";

    let preview: FilePreview;
    let file: File

    export let params: {type: MediaType};
    const types= {
        "audio": "um áudio",
        "video": "um vídeo",
        "image": "uma imagem",
    }

    $:{
        if(file !== undefined){
            preview.setFile(file);
            let data = {
                file: file as any, 
                mediaType: params.type as any, 
                mediaProps: {}
            };
            if(params.type === MediaType.VIDEO || params.type === MediaType.IMAGE){
                data = {
                    ...data, 
                    mediaProps: {}
                }
            }
            loadedFile.set(data);
        }
    }

    const resetFile = () => {
        file = undefined as any;
        preview.reset();
        loadedFile.set({ 
            file: null as any, 
            mediaType: MediaType.EMPTY, 
            mediaProps: {}
        });
    };
</script>



<main class="d-flex flex-column text-center align-items-center pt-3 justify-content-start container-fluid h-100">
    <header class="pt-3">
        <p class="h2">Carregue {types[params.type]} para converter</p>
    </header>
    <div class="content d-flex align-items-center w-100">
        <aside class="w-50 d-flex cols">
            <FilePreview bind:this={preview} height="100%" width="100%" type={params.type}/>
        </aside>
        <aside class="w-50 cols d-flex flex-column">
            {#if !file}
                <FileInput bind:file={file}/>
            {:else}
                <div class="w-100 d-flex flex-column align-items-center">
                    <a class="btn btn-primary mb-3" href="#/convert/{params.type}">Continuar</a>
                    <button on:click={resetFile} class="btn btn-light" href="">Carregar um ficheiro diferente</button>
                </div>
            {/if}
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

    .btn{
        width: 50%;
    }

    a, a:hover{
        background-color: var(--color-accent);
        border-color: var(--color-accent);
    }
</style>
