<script lang="typescript">
    import { onMount, tick } from "svelte"

    export let type: string = "video";
    export let file: File ;
    let mediaElement: HTMLMediaElement;
    let input: HTMLInputElement;
    let preview: HTMLParagraphElement;


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
    <p bind:this={preview} class="mb-4 preview">Nenhum ficheiro selecionado</p>
    {#if file && type == "video"}
        <video class="mb-4" bind:this={mediaElement} width="250" src="" controls></video>
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
