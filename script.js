// Function to fetch educational shorts from YouTube
async function getEducationalShorts(apiKey, maxResults = 10) {
    try {
      // YouTube Data API endpoint
      const apiUrl = 'https://www.googleapis.com/youtube/v3/search';
  
      // Make a request to the API
      const response = await fetch(`${apiUrl}?key=${apiKey}&part=snippet&q=educational%20shorts&type=video&maxResults=${maxResults}`);
      const data = await response.json();
  
      // Extract video information from the response
      const videos = data.items.map(item => {
        return {
          title: item.snippet.title,
          videoId: item.id.videoId,
        };
      });
  
      return videos;
    } catch (error) {
      console.error('Error fetching educational shorts:', error);
      return [];
    }
  }
  
  // Function to render videos on the page
  function renderVideos(videos) {
    const videosContainer = document.getElementById('videos-container');
    videos.forEach(video => {
      // Create a container for each video
      const videoContainer = document.createElement('div');
      
      // Create an iframe for the video
      const iframe = document.createElement('iframe');
      iframe.width = 315; // You can adjust the width and height as needed
      iframe.height = 560;
      iframe.src = `https://www.youtube.com/embed/${video.videoId}`;
      iframe.allowfullscreen = true;
  
      // Create a paragraph for the video title
      const titleParagraph = document.createElement('p');
      titleParagraph.textContent = video.title;
  
      // Append the iframe and title to the video container
      videoContainer.appendChild(iframe);
      videoContainer.appendChild(titleParagraph);
  
      // Append the video container to the main container
      videosContainer.appendChild(videoContainer);
    });
  }
  
  // Example usage
  const apiKey = 'AIzaSyBUG7vmvs9wNDFWckrj5H8xU010zlc94Ec';
  getEducationalShorts(apiKey,9).then(videos => {
    console.log('Educational Shorts:', videos);
    renderVideos(videos);
  });
