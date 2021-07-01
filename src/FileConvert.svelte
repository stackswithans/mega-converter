<script lang="typescript">
    import { onMount, tick } from "svelte";
    import { push } from "svelte-spa-router";
    import FilePreview from "./FilePreview.svelte";
    import Button from "./Button.svelte";
    import { loadedFile } from "./stores";
    import { MediaType } from "./types";

    
    let width: number = 0;
    let height: number = 0;
    let maxWidth: number = 0;
    let maxHeight: number = 0;

    let media: MediaType = MediaType.IMAGE ;
    let preview: FilePreview;

    let {file, mediaType, mediaProps } = $loadedFile;

    onMount(async() => {
        if(file === null || mediaType === MediaType.EMPTY){
            push("/");
            return;
        }
        preview.setFile(file as any);
    });

    $: {
        if((maxWidth && maxHeight) && !(width && height)){
            width = maxWidth;
            height = maxHeight;
        }
    }

</script>

<main class="d-flex flex-column text-center align-items-center pt-3 justify-content-start container-fluid h-100">
    <header class="pt-3">
        <p class="h2">Altere os parâmetros de conversão</p>
    </header>
    <div class="content d-flex align-items-center w-100">
        <aside class="w-50 d-flex cols">
            <FilePreview bind:elementWidth={maxWidth} bind:elementHeight={maxHeight} bind:this={preview} height="100%" width="100%" type={media}/>
        </aside>
        <aside class="w-50 cols d-flex text-start flex-column">
            <div class="mb-3">
                <label for="largura" class="form-label">Largura (em pixels)</label>
                <input bind:value={width} max={maxWidth} type="number" class="form-control" id="Largura">
            </div>
            <div class="mb-3">
                <label for="altura" class="form-label">Altura (em pixels)</label>
                <input bind:value={height} max={maxHeight} type="number" class="form-control" id="altura">
            </div>
            <div class="mb-4">
                <label for="altura" class="form-label">Formato de saída</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Escolha um formato de saída</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <Button width="60%">Converter</Button>
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

    input, select{
        width:60%;
    }

    input:focus, select:focus, select:active, input:active{
        outline: var(--color-accent);
    }
</style>
