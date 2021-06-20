<script lang="typescript">
    import Tab from "./Tab.svelte";

    let formatOptions = [
        { value: "mp4", text: "MP4" },
        { value: "webm", text: "WEBM" },
        { value: "mov", text: "MOV" },
        { value: "mp3", text: "MP3 (Áudio apenas)" },
    ];
</script>

<Tab emptyLabel="Nenhum vídeo selecionado" fileType="video" selectLabel="Formato de vídeo" {formatOptions}/>
