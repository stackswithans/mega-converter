<script lang="typescript">
    export let width: string;
</script>

<button on:click class="btn btn-primary" style="width:{width};"><slot></slot></button>




<style>
    .btn, .btn:hover, .btn:active, .btn:focus{
        background-color: var(--color-accent);
        border-color: var(--color-accent);
        outline: var(--color-accent);
        color: white;
    }
</style>
