import VideoTab from "./VideoTab.svelte";
import ImageTab from "./ImageTab.svelte";
import AudioTab from "./AudioTab.svelte";
import Home from "./Home.svelte";
import FileSelect from "./FileSelect.svelte";

const routes = {
    "/": Home,
    "/select/:type": FileSelect,
    "/video": VideoTab,
    "/image": ImageTab,
    "/audio": AudioTab,
}


export default routes;
