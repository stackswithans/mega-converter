<script lang="typescript">
    import { onMount, tick } from "svelte"

    export let emptyLabel: string = "Nenhum ficheiro selecionado";
    export let type: string = "video";
    export let file: File ;
    let imageElement: HTMLImageElement
    let mediaElement: HTMLMediaElement;
    let input: HTMLInputElement;
    let preview: HTMLParagraphElement;


    export const reset = () => {
        input.value = "";
        if(type === "video")
            mediaElement.src = "";
        else
            imageElement.src = ""; 
        file = undefined as any; //Crazy hack to allow
    };

    const uploadFile = () => {
        input.click();
    };

    onMount(() =>{
        input.addEventListener("change", async function(){
            file = this.files[0];
            await tick();
            preview.innerText = `Detalhes: ${file.name}, ${(file.size/1024/1024).toFixed(2)}MB`;
            mediaElement.src = URL.createObjectURL(file)
        }, false);
    });
</script>


<main class="d-flex align-items-center flex-column">
    <input on:change bind:this={input} class="invisible" type="file" name="file">
    <p bind:this={preview} class="mb-4 preview">{emptyLabel}</p>
    {#if file && type == "video"}
        <video class="mb-4" bind:this={mediaElement} width="250" src="" controls></video>
    {:else if file && type == "image"}
        <img class="mb-4" bind:this={imageElement} alt="preview of converted file" width="250" src=""/>
    {:else if file && type == "audio"}
        <audio class="mb-4" bind:this={mediaElement}  src="" controls></audio>
    {/if}
    <button on:click={uploadFile} class="btn btn-sm btn-primary">Carregar ficheiro</button>
</main>


<style>
    input {
        width: 0;
        height: 0;
    }

    .btn{
        width: fit-content;
    }
</style>
