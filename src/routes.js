import VideoTab from "./VideoTab.svelte";
import ImageTab from "./ImageTab.svelte";
import AudioTab from "./AudioTab.svelte";

const routes = {
    "/": VideoTab,
    "/video": VideoTab,
    "/image": ImageTab,
    "/audio": AudioTab,
}


export default routes;
