const API_KEY = 'AIzaSyALr70k1PRFUDHpxzwxzvcijw9IdOUVTZE';
 // Replace with your YouTube Data API v3 key
// Replace your existing JavaScript with this code

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get all the subject links
  var subjects = document.querySelectorAll(".subject");

  // Add a click event listener to each subject link
  subjects.forEach(function(subject) {
      subject.addEventListener("click", function(event) {
          // Prevent the default action of the link
          event.preventDefault();

          // Get the ID of the target topics menu from the data-target attribute
          var targetId = subject.getAttribute("data-target");
          // Get the corresponding topics menu element
          var targetMenu = document.getElementById(targetId);

          // Hide all topics menus
          var allMenus = document.querySelectorAll(".scrollmenu.topics");
          allMenus.forEach(function(menu) {
              menu.style.display = "none";
          });

          // Show the clicked topics menu
          if (targetMenu) {
              targetMenu.style.display = "block";
          }
      });
  });

  // YouTube Data API key (replace with your own)

  // Function to fetch videos based on the selected topic
  document.querySelectorAll('.scrollmenu.topics a').forEach(topic => {
      topic.addEventListener('click', event => {
          event.preventDefault();
          const query = topic.textContent; // Use topic text as query

          fetchVideos(query);
      });
  });

  function fetchVideos(query) {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query+"shorts")}&key=${API_KEY}`;

      fetch(url)
          .then(response => response.json())
          .then(data => {
              const videosContainer = document.getElementById('videosContainer');
              videosContainer.innerHTML = '';
              data.items.forEach(item => {
                  const videoId = item.id.videoId;
                  const videoTitle = item.snippet.title;
                  const videoIframe = document.createElement('iframe');
                  videoIframe.src = `https://www.youtube.com/embed/${videoId}`;
                  videoIframe.title = videoTitle;
                  videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                  videoIframe.allowFullscreen = true;
                  videosContainer.appendChild(videoIframe);
              });
          })
          .catch(error => {
              console.error('Error fetching videos:', error);
          });
  }
});
