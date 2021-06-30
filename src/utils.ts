import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export const ffmpeg = createFFmpeg({
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

const mimeTypes: { [key: string]: { [key: string]: string } } = {
    video: {
        gif: "image/gif",
        webm: "video/webm",
        mp4: "video/mp4",
    },
    image: {
        gif: "image/gif",
        webm: "image/webm",
        png: "image/png",
        jpg: "image/jpeg",
        webp: "image/webp",
    },
    audio: {
        mp3: "audio/mp3",
        flac: "audio/flac",
    },
};

export const convertFile = async (
    file: File,
    fileType: "video" | "image" | "audio",
    outputType: string
): Promise<[Blob, string]> => {
    if (!ffmpeg.isLoaded()) await ffmpeg.load();
    let [name, extension] = file.name.split(".");
    let inputFile = "input" + "." + extension;
    let outputFile = name + "." + outputType;
    ffmpeg.FS("writeFile", inputFile, await fetchFile(file));
    const t1 = performance.now();
    let args = [];
    if (fileType == "video") {
        args = ["-i", inputFile, "-crf", "28", "-r", "30", outputFile];
    } else args = ["-i", inputFile, outputFile];
    await ffmpeg.run(...args);
    const conversionTime = (performance.now() - t1) / 1000;
    let data = ffmpeg.FS("readFile", outputFile);
    let output = new Blob([data.buffer], {
        type: mimeTypes[fileType][outputType],
    });
    console.log(`Tempo de conversão: ${conversionTime}`);
    console.log(`Comprimido por:  ${100 - (output.size * 100) / file.size}%`);
    return [output, outputFile];
};
