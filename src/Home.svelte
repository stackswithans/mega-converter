<main class="d-flex flex-column align-items-center pt-3 justify-content-start container-fluid h-100">
    <header class="pt-5 text-center">
        <p class="h2">O quê que deseja converter?</p>
    </header>
    <div class="content d-flex align-items-center pt-5 px-2">
        <div class="my-card d-flex flex-column">
            <i class="fas fa-images"></i>
            <p>Imagens</p>
            <p class="desc">
                Converta imagens para formatos como PNG e JPEG
            </p>
        </div>
        <div class="my-card d-flex flex-column">
            <i class="fas fa-film"></i>
            <p>Vídeos</p>
            <p class="desc">
            Converta vídeos para formatos como MP4, WEBP ou MP3 (áudio apenas). 
            </p>
        </div>
        <div class="my-card d-flex flex-column">
            <i class="fas fa-music"></i>
            <p>Áudios</p>
            <p class="desc">
                Converta suas músicas favoritas para MP3 e FLAC.
            </p>
        </div>
    </div>
</main>




<style>
    .my-card{
        flex-grow: 1;
        gap: 2rem;
        justify-content: center;
        align-items: center;
    }

    .content{
        text-align: center;
        flex-grow: 1;
        width: 100%;
        flex-wrap: nowrap;
    }

    .my-card i{
        font-size: 3.5rem;
    }

    .my-card .desc{
        margin: 0;
        width: 20ch;
    }

    main{
        color: white;
        background-color: #32312F;
    }


    .my-card:hover{
        cursor: pointer;
    }
</style>
