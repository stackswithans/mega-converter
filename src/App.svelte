<script lang='typescript'>
        import Router from "svelte-spa-router";
	import routes from './routes';
</script>

<svelte:head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/4b291d6efe.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    <title>Mega Converter</title>
</svelte:head>

<Router {routes}/>
  
<style>
    :global(:root){
        --color-bg: #32312F !important;
        --color-accent: #34DBA1 !important;
    }

    :global(*, html, body){
        box-sizing: border-box;
    }

    :global(html){
        height: fit-content;
    }

    :global(body){
        height: 100vh;
    }
</style>

  
