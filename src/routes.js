import Home from "./Home.svelte";
import FileSelect from "./FileSelect.svelte";
import ImageConvert from "./ImageConvert.svelte";
import VideoConvert from "./VideoConvert.svelte";
import AudioConvert from "./AudioConvert.svelte";

const routes = {
    "/": Home,
    "/select/:type": FileSelect,
    "/convert/video": VideoConvert,
    "/convert/image": ImageConvert,
    "/convert/audio": AudioConvert,
}


export default routes;
