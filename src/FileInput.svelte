<script lang="typescript">
    let video: HTMLInputElement;
</script>


<main class="d-flex flex-column">
    <input bind:this={video} class="invisible" type="file" name="file">
    <div class="mb-4 preview">Nenhum ficheiro selecionado</div>
    <button class="btn btn-sm btn-primary">Carregar ficheiro</button>
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
