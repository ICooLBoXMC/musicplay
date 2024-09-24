var player;
var isPlaying = false;

// Load YouTube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.getElementsByTagName('head')[0].appendChild(tag);

// This function gets called when the YouTube IFrame API is ready
function onYouTubeIframeAPIReady() {
  console.log('YouTube IFrame API Ready!');
}

// Extract playlist ID from YouTube URL
function extractPlaylistId(url) {
  try {
    const urlParams = new URL(url).searchParams;
    return urlParams.get('list');
  } catch (e) {
    alert('Invalid URL format');
    return null;
  }
}

// Load and initialize the YouTube playlist player
function loadPlaylist(playlistId) {
  if (player) {
    player.destroy();
  }

  player = new YT.Player('player', {
    height: '400',
    width: '100%',
    playerVars: {
      listType: 'playlist',
      list: playlistId,
      autoplay: 0,
      loop: 1,
      modestbranding: 1,
      rel: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// Player ready
function onPlayerReady() {
  document.getElementById('togglePlayStopButton').addEventListener('click', togglePlayStop);
  document.getElementById('skipButton').addEventListener('click', () => player.nextVideo());
}

// Toggle play and stop
function togglePlayStop() {
  if (isPlaying) {
    player.pauseVideo();
    document.getElementById('togglePlayStopButton').textContent = 'Play';
  } else {
    player.playVideo();
    document.getElementById('togglePlayStopButton').textContent = 'Pause';
  }
  isPlaying = !isPlaying;
}

// Handle state change
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player.nextVideo();
  }
}

// Event listener for loading playlist
document.getElementById('loadPlaylist').addEventListener('click', function () {
  var playlistURL = document.getElementById('playlistInput').value;
  var playlistId = extractPlaylistId(playlistURL);
  
  if (playlistId) {
    loadPlaylist(playlistId);
    document.getElementById('playlistInput').value = '';  // Clear input after loading
  } else {
    alert('Please enter a valid YouTube playlist link.');
  }
});
