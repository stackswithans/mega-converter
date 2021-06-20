
<script lang="typescript">
    import Tab from "./Tab.svelte";

    let formatOptions = [
        { value: "mp3", text: "MP3" },
        { value: "flac", text: "FLAC" },
    ];
</script>

<Tab emptyLabel="Nenhum ficheiro de áudio selecionado" fileType="audio" selectLabel="Formato de áudio" {formatOptions}/>
