// arkA Hello World client script
// This script tries to load a sample index.json file and render basic info.

(async function () {
  const button = document.getElementById('loadVideos');
  const output = document.getElementById('output');

  if (!button || !output) {
    console.error('arkA Hello World: missing expected DOM elements.');
    return;
  }

  button.addEventListener('click', async () => {
    output.textContent = 'Loading sample index.json…';

    try {
      // This will be created in a later step:
      // examples/index.json
      const res = await fetch('../examples/index.json');

      if (!res.ok) {
        output.textContent = `Failed to load index.json (status ${res.status}). Make sure ../examples/index.json exists.`;
        return;
      }

      const data = await res.json();

      if (!Array.isArray(data.videos)) {
        output.textContent = 'index.json loaded, but no "videos" array was found.';
        console.warn('Unexpected index.json format:', data);
        return;
      }

      if (data.videos.length === 0) {
        output.textContent = 'index.json loaded, but it contains no videos.';
        return;
      }

      // Build a simple list of videos
      const list = document.createElement('ul');

      data.videos.forEach((video, idx) => {
        const li = document.createElement('li');

        const title = video.title || `Video ${idx + 1}`;
        const url =
          (video.sources &&
            Array.isArray(video.sources) &&
            video.sources[0] &&
            video.sources[0].url) ||
          video.url ||
          null;

        // Title
        const strong = document.createElement('strong');
        strong.textContent = title;
        li.appendChild(strong);

        // Duration (optional)
        if (typeof video.duration === 'number') {
          const span = document.createElement('span');
          span.textContent = ` — duration: ${Math.round(video.duration)}s`;
          span.style.marginLeft = '0.25rem';
          li.appendChild(span);
        }

        // Link (if we have a playable URL)
        if (url) {
          const link = document.createElement('a');
          link.href = url;
          link.textContent = ' open';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          li.appendChild(link);
        }

        list.appendChild(li);
      });

      // Replace output contents
      output.innerHTML = '';
      output.appendChild(list);
    } catch (err) {
      console.error('Error loading index.json:', err);
      output.textContent = 'Error loading or parsing index.json. See console for details.';
    }
  });
})();