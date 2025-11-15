import { loadVideo } from "./services/fetchVideo";
import { renderVideo } from "./controllers/videoController";

(async () => {
  const metadataUrl = new URLSearchParams(window.location.search).get("meta");

  if (!metadataUrl) {
    document.body.innerHTML = "<h2>No metadata URL provided.</h2>";
    return;
  }

  const video = await loadVideo(metadataUrl);
  renderVideo(video);
})();