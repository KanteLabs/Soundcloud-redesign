import SC from 'soundcloud';
export const client_id= "0PKz7xjH5uemKDK8GdHQyO0mU9kZ0fJ2";
export const client_secret = "pTE5IADHjTRMwCnKsv7NQFdsPqDd7qJc";

export const Config = {
  hi: 'hello',
  search: `https://api.soundcloud.com/tracks?&client_id=${client_id}&limit=100&offset=0&q=`,
  newTracks: `https://api.soundcloud.com/tracks?format=json&client_id=${client_id}`,
  genreTag: `https://api.soundcloud.com/tracks?&client_id=${client_id}&limit=50&offset=0&tags=`,
  singleTrack: `https://api.soundcloud.com/tracks`,
  userTracks: `https://api.soundcloud.com/users/`
}

export const genreName = [
	"Pop",
	"Hip-Hop",
	"Reggae",
	"R&B",
	"EDM",
	"Dubstep",
]

export const IMAGE_SIZES = {
  LARGE: 't300x300',
  XLARGE: 't500x500',
}

export function getImageUrl(s, size = null) {
  let str = s;
  if (!str) {
    return '';
  }

  str = str.replace('http:', '');

  switch (size) {
    case IMAGE_SIZES.LARGE:
      return str.replace('large', IMAGE_SIZES.LARGE);
    case IMAGE_SIZES.XLARGE:
      return str.replace('large', IMAGE_SIZES.XLARGE);
    default:
      return str;
  }
}

export const handleTrackPlay = function(track){
 SC.initialize({client_id: Config.client_id, client_secret: Config.client_secret});

  // var player = SC.stream("tracks/"+track+"/stream", {useHTML5Audio: true},
  //   function(player){
  //     player.play();
  // });

//   playCallBack(event){
//     let track = (event.target.title)
//     console.log(track)
//     SC.initialize({client_id: client_id, client_secret: client_secret});

//     var player = SC.stream("tracks/"+track+"/stream", {useHTML5Audio: true},
//         function(player){
//         player.play();
//     });
// }
}

export const handleLoginClick = function() {
  SC.initialize({
    client_id: Config.client_id,
    redirect_uri: 'https://kantelabs.github.io/KanteCloud/callback.html',
    oauth_token: ""
  });

  // initiate auth popup
  SC.connect().then(function() {
      return SC.get('/me');
  }).then(function(me) {
    console.log('Hello, ' + me.username);
    document.querySelector('.loginItem').innerText = me.username;
    SC.get('/me/favorites')
  })
}
