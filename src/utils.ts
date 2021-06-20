import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export const ffmpeg = createFFmpeg({
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

const mimeTypes: { [key: string]: string } = {
    gif: "image/gif",
    webm: "video/webm",
    mp4: "video/mp4",
    mp3: "audio/mp3",
};

export const convertFile = async (
    file: File,
    outputType: string
): Promise<[Blob, string]> => {
    if (!ffmpeg.isLoaded()) await ffmpeg.load();
    let [name, extension] = file.name.split(".");
    let inputFile = "input" + "." + extension;
    let outputFile = name + "." + outputType;
    ffmpeg.FS("writeFile", inputFile, await fetchFile(file));
    const t1 = performance.now();
    await ffmpeg.run("-i", inputFile, "-crf", "28", "-r", "30", outputFile);
    const conversionTime = (performance.now() - t1) / 1000;
    let data = ffmpeg.FS("readFile", outputFile);
    console.log(`Tempo de conversão: ${conversionTime}`);
    return [
        new Blob([data.buffer], { type: mimeTypes[outputType] }),
        outputFile,
    ];
};
