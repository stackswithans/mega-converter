import VideoTab from "./VideoTab.svelte";
import ImageTab from "./ImageTab.svelte";
import FileConvert from "./FileConvert.svelte";
import AudioTab from "./AudioTab.svelte";
import Home from "./Home.svelte";
import FileSelect from "./FileSelect.svelte";

const routes = {
    "/": Home,
    "/select/:type": FileSelect,
    "/convert/video": VideoTab,
    "/convert/image": FileConvert,
    "/convert/audio": AudioTab,
}


export default routes;
