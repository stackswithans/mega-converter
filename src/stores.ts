import { writable } from "svelte/store";
import { MediaType } from "./types";

type FileData = {
    file: File | null;
    mediaType: MediaType;
    mediaProps: Record<string, number>;
};
export const loadedFile = writable<FileData>({
    file: null,
    mediaType: MediaType.EMPTY,
    mediaProps: {},
});
