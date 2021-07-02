<script lang="typescript">
    import { onMount } from "svelte"
    import Spinner from "./Spinner.svelte";

    export let file: File ;
    export let accept: string;

    let input: HTMLInputElement;
    let fileUrl: string;

    let loading: boolean = false;

    onMount(() =>{
        input.addEventListener("change", async function(e: Event){
            file = this.files[0];
        }, false);
    });


    export const reset = () => {
        input.value = "";
        file = undefined as any; //Crazy hack to allow
    };

    const uploadFile = () => {
        input.click();
    };

    const fetchFile = async () => {
        if(!fileUrl) return;
        let response; 
        loading = true;
        try{
            response = await fetch(fileUrl, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers:{
                    Accept:accept, 
                },
                redirect: 'follow', 
            });
        }
        catch(e){
            alert("Não foi possível baixar o ficheiro ");
            loading = false;
            return;
        }

        const blob = await response.blob();
        let [prefix, extension] = blob.type.split("/");
        file = new File([blob], `${prefix}_${new Date().getTime()}.${extension}`);
        loading = false;
    };

</script>
{#if loading}
    <Spinner/>
{/if}


<main class="d-flex align-items-center flex-column">
    <input on:change bind:this={input} class="invisible" type="file" name="file" {accept}>
    <button on:click={uploadFile} class="btn btn-primary">Escolher ficheiro do computador</button>
    <p class="my-4">ou carregue ficheiro da web:</p>
    <input bind:value={fileUrl} type="text" class="form-control" placeholder="Link para o ficheiro"/>
    <button on:click={fetchFile} class="btn btn-primary">Carregar ficheiro</button>
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

    .btn, .btn:hover, .btn:active, .btn:focus{
        width: fit-content;
        background-color: var(--color-accent);
        border-color: var(--color-accent);
    }
</style>
