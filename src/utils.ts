import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export const ffmpeg = createFFmpeg({
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    log: true,
});

export const initialize = async () => {
    await ffmpeg.load();
};

const mimeTypes: { [key: string]: string } = {
    gif: "image/gif",
    webm: "video/webm",
};

export const convertFile = async (
    file: File,
    outputType: string
): Promise<[Blob, string]> => {
    if (!ffmpeg.isLoaded()) await initialize();
    let [name, extension] = file.name.split(".");
    let inputFile = "input" + "." + extension;
    let outputFile = name + "." + outputType;
    ffmpeg.FS("writeFile", inputFile, await fetchFile(file));
    await ffmpeg.run("-i", inputFile, "-crf", "28", "-r", "30", outputFile);
    let data = ffmpeg.FS("readFile", outputFile);
    return [
        new Blob([data.buffer], { type: mimeTypes[outputType] }),
        outputFile,
    ];
};
