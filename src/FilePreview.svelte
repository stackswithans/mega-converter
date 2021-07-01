<script lang="typescript">
    import { tick } from "svelte"

    export let type: string = "video";
    let fileDetails = "Nenhum ficheiro selecionado"; 
    export let width: string;
    export let height: string;
    let imageElement: HTMLImageElement
    let mediaElement: HTMLMediaElement;
    let fileIsSet = false;



    export const reset = () => {
        fileIsSet = false;
        fileDetails = "Nenhum ficheiro selecionado"; 
        if(type === "image")
            imageElement.src = ""; 
        else
            mediaElement.src = ""; 
    };

    export const setFile = async (file: File) => {
        fileIsSet = true;
        await tick();
        fileDetails = `Detalhes: ${file.name}, ${(file.size/1024/1024).toFixed(2)}MB`;
        if(type === "image")
            imageElement.src = URL.createObjectURL(file)
        else
            mediaElement.src = URL.createObjectURL(file)
    };
</script>


<main style="width:{width};height:{height}" class="d-flex align-items-center justify-content-center flex-column">
    <p class="mb-4 preview">{fileDetails}</p>
    {#if fileIsSet && type == "video"}
        <video class="mb-4" bind:this={mediaElement} src="" controls></video>
    {:else if fileIsSet && type == "image"}
        <img class="mb-4" bind:this={imageElement} alt="preview of converted file" src=""/>
    {:else if fileIsSet && type == "audio"}
        <audio class="mb-4" bind:this={mediaElement}  src="" controls></audio>
    {/if}
</main>


<style>
    img, video, audio{
        max-width: 250px;
        max-height: 250px;
    }
</style>
