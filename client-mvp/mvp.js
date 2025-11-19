// arkA MVP client script
// - Accepts a CID or full URL
// - Optional custom gateway (defaults to https://ipfs.io/ipfs/)
// - Supports ?cid=<CID> in the page URL

const cidInput = document.getElementById("cid-input");
const gatewayInput = document.getElementById("gateway-input");
const form = document.getElementById("cid-form");
const statusEl = document.getElementById("status");
const videoEl = document.getElementById("video-player");

const DEFAULT_GATEWAY = "https://ipfs.io/ipfs/";

// Read ?cid= from querystring, if present
function getCidFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const cid = params.get("cid");
  return cid ? cid.trim() : "";
}

// If user types a bare CID, build a URL from gateway
function buildVideoUrl(cidOrUrl, gateway) {
  const value = cidOrUrl.trim();

  if (!value) return "";

  // If it already looks like a URL, just use it as-is
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  // Otherwise treat as CID
  const base = (gateway || DEFAULT_GATEWAY).trim() || DEFAULT_GATEWAY;

  // Ensure trailing slash
  const normalizedBase = base.endsWith("/") ? base : base + "/";

  return normalizedBase + value;
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("status-error", isError);
}

function playFromInput() {
  const cidOrUrl = cidInput.value;
  const gateway = gatewayInput.value || DEFAULT_GATEWAY;

  if (!cidOrUrl.trim()) {
    setStatus("Please enter a CID or IPFS URL.", true);
    return;
  }

  const videoUrl = buildVideoUrl(cidOrUrl, gateway);

  if (!videoUrl) {
    setStatus("Could not build a video URL from that input.", true);
    return;
  }

  setStatus("Loading video…");
  videoEl.src = videoUrl;

  // Try to play (some browsers require user gesture; errors are fine)
  videoEl
    .play()
    .then(() => {
      setStatus("Playing from: " + videoUrl);
    })
    .catch(() => {
      setStatus("Ready. Press play if the browser blocked autoplay.");
    });

  // Update the URL with ?cid= so it’s shareable/bookmarkable
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("cid", cidOrUrl.trim());
    window.history.replaceState({}, "", url.toString());
  } catch {
    // Ignore if something goes wrong constructing URL
  }
}

// Handle form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  playFromInput();
});

// On initial load, auto-fill from ?cid= if present
window.addEventListener("DOMContentLoaded", () => {
  const queryCid = getCidFromQuery();
  if (queryCid) {
    cidInput.value = queryCid;
    playFromInput();
  } else {
    setStatus("Paste an IPFS CID or URL to begin.");
    gatewayInput.placeholder = DEFAULT_GATEWAY;
  }
});