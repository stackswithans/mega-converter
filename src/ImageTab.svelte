
<script lang="typescript">
    import Tab from "./Tab.svelte";

    let formatOptions = [
        { value: "png", text: "PNG" },
        { value: "jpg", text: "JPEG" },
        { value: "gif", text: "GIF" },
        { value: "webp", text: "WEBP" },
    ];
</script>

<Tab emptyLabel="Nenhuma imagem selecionada" fileType="image" selectLabel="Formato de imagem" {formatOptions}/>
