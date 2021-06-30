
<script lang='typescript'>
        import Router from "svelte-spa-router";
	import routes from './routes';

        let videoTab: HTMLAnchorElement;
        let imageTab: HTMLAnchorElement;
        let audioTab: HTMLAnchorElement;

        const switchTab = (e: MouseEvent) => {
           videoTab.classList.remove("active")
           imageTab.classList.remove("active")
           audioTab.classList.remove("active")
           let target = e.target as HTMLAnchorElement;
           target.classList.add("active");
        };
</script>

<svelte:head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
</svelte:head>

<main class="d-flex flex-column align-items-center pt-3 justify-content-start container-fluid h-100 ">
    <h4 class="mb-4">Mega Conversor</h4>
    <ul class="nav nav-tabs justify-content-center w-100 h-100, " id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <a href="#/video/" on:click={switchTab} bind:this={videoTab} class="nav-link active" id="video-tab"  
                 type="button" role="tab" aria-controls="home" aria-selected="true">
                Vídeo
            </a>
        </li>
        <li class="nav-item" role="presentation">
            <a href="#/image/"  on:click={switchTab} bind:this={imageTab}  class="nav-link" id="image-tab"  
                type="button" role="tab" aria-controls="profile" aria-selected="false">
                Imagem
            </a>
        </li>
        <li class="nav-item" role="presentation">
            <a  href="#/audio/" class="nav-link"  on:click={switchTab} bind:this={audioTab} id="sound-tab" 
            type="button" role="tab" aria-controls="contact" aria-selected="false">
                Som
            </a>
        </li>
    </ul>
    <div class="pt-4 px-2 w-100">
        <Router {routes}/>
    </div>
</main>
  
<style>
    :global(:root){
        --color-primary: #32312F;
        --color-secondary: #0DC5A1;
    }

    :global(*, html, body){
        box-sizing: border-box;
        color: white;
    }

    :global(html){
        height: fit-content;
    }

    :global(body){
        height: 100vh;
    }
</style>

  
