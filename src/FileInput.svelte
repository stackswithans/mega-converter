<script lang="typescript">
    import { onMount } from "svelte"

    export let file: File ;
    let input: HTMLInputElement;

    export const reset = () => {
        input.value = "";
        file = undefined as any; //Crazy hack to allow
    };

    const uploadFile = () => {
        input.click();
    };

    onMount(() =>{
        input.addEventListener("change", async function(e: Event){
            file = this.files[0];
        }, false);
    });
</script>


<main class="d-flex align-items-center flex-column">
    <input on:change bind:this={input} class="invisible" type="file" name="file">
    <button on:click={uploadFile} class="btn btn-primary">Escolher ficheiro do computador</button>
    <p class="my-4">ou baixe ficheiro da web:</p>
    <input type="text" class="form-control" placeholder="Link para o ficheiro"/>
    <button on:click class="btn btn-primary">Baixar ficheiro</button>
</main>


<style>
    main{
        gap: 1rem;
    }


    input[type="text"] {
        max-width: 50%;
    }

    input[type="file"] {
        width: 0;
        height: 0;
    }

    .btn{
        width: fit-content;
        background-color: var(--color-accent);
        border-color: var(--color-accent);
    }
</style>
