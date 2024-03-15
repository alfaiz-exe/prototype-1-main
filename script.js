// Function to fetch educational shorts from YouTube
async function getEducationalShorts(apiKey, maxResults = 10) {
  try {
    // YouTube Data API endpoint
    const apiUrl = 'https://www.googleapis.com/youtube/v3/search';

    // Make a request to the API
    const response = await fetch(`${apiUrl}?key=${apiKey}&part=snippet&q=2minutejs%20shorts&type=video&maxResults=${maxResults}`);
    const data = await response.json();

    // Extract video information from the response
    const videoIds = data.items.map(item => item.id.videoId).join(',');
    const videosResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoIds}?vq480`);
    const videosData = await videosResponse.json();

    // Extract full descriptions and other video information
    const videos = data.items.map((item, index) => {
      return {
        title: item.snippet.title,
        description: videosData.items[index].snippet.description,
        videoId: item.id.videoId,
      };
    });

    return videos;
  } catch (error) {
    console.error('Error fetching educational shorts:', error);
    return [];
  }
}

// Function to render videos on the page with lazy loading and embedded YouTube players
function renderVideosLazy(videos) {
  const videosContainer = document.getElementById('videos-container');
  videos.forEach(video => {
    // Create a container for each video
    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video-container');

    // Create the YouTube player iframe
    const playerIframe = document.createElement('iframe');
    playerIframe.src = `https://www.youtube.com/embed/${video.videoId}`;
    playerIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    playerIframe.allowFullscreen = true;
    playerIframe.height = 560;
    // Create a paragraph for the video title (permanent)
    const titleParagraph = document.createElement('p');
    titleParagraph.textContent = video.title;
    titleParagraph.classList.add('video-title');

    // Create a paragraph for the full description (initially hidden)
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = video.description;
    descriptionParagraph.classList.add('description');
    descriptionParagraph.style.display = 'none'; // Initially hide description

    // Create a button to toggle description visibility
    const descriptionButton = document.createElement('button');
    descriptionButton.textContent = 'Show Description';
    descriptionButton.classList.add('description-button');

    // Add click event listener to toggle description visibility
    descriptionButton.addEventListener('click', () => {
      if (descriptionParagraph.style.display === 'none') {
        descriptionParagraph.style.display = 'block';
        descriptionButton.textContent = 'Hide Description';
      } else {
        descriptionParagraph.style.display = 'none';
        descriptionButton.textContent = 'Show Description';
      }
    });

    // Append elements to the video container
    videoContainer.appendChild(playerIframe);
    videoContainer.appendChild(titleParagraph);
    videoContainer.appendChild(descriptionButton);
    videoContainer.appendChild(descriptionParagraph);

    // Append the video container to the main container
    videosContainer.appendChild(videoContainer);
  });
}

// Example usage with lazy loading
const apiKey = 'AIzaSyBUG7vmvs9wNDFWckrj5H8xU010zlc94Ec'; // Replace with your API key
getEducationalShorts(apiKey, 5)
  .then(videos => {
    console.log('Educational Shorts:', videos);
    renderVideosLazy(videos);
  })
  .catch(error => {
    console.error('Error:', error);
  });
