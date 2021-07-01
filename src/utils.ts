import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { MediaType } from "./types";

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
    fileType: MediaType,
    outputType: string,
    options: Record<string, any>
): Promise<[Blob, string]> => {
    if (!ffmpeg.isLoaded()) await ffmpeg.load();
    let [name, extension] = file.name.split(".");
    let inputFile = "input" + "." + extension;
    let outputFile = name + "." + outputType;
    ffmpeg.FS("writeFile", inputFile, await fetchFile(file));
    console.log(inputFile);
    const t1 = performance.now();
    let args = [];
    switch (fileType) {
        case MediaType.VIDEO:
            args = [
                "-i",
                inputFile,
                "-vf",
                `scale=-1:${options.resolution}`,
                "-filter:v",
                `fps=${options.fps}`,
                outputFile,
            ];
            break;
        case MediaType.IMAGE:
            args = [
                "-i",
                inputFile,
                "-vf",
                `scale=${options.width}:${options.height}`,
                outputFile,
            ];
            break;
        default:
            args = ["-i", inputFile, outputFile];
            break;
    }
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
