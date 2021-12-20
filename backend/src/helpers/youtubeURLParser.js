// Source: 
// https://stackoverflow.com/questions/3452546/

// returns the code for the video for most of possible URLS
export default function youtubeURLParser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}