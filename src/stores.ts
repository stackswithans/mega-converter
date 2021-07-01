import { writable } from "svelte/store";
import { MediaType } from "./types";

type FileData = { file: File | null; mediaType: MediaType };
export const loadedFile = writable<FileData>({
    file: null,
    mediaType: MediaType.EMPTY,
});
