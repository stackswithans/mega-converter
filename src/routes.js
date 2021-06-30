import VideoTab from "./VideoTab.svelte";
import ImageTab from "./ImageTab.svelte";
import AudioTab from "./AudioTab.svelte";
import Home from "./Home.svelte";

const routes = {
    "/": Home,
    "/video": VideoTab,
    "/image": ImageTab,
    "/audio": AudioTab,
}


export default routes;
