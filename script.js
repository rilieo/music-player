
let track_art = document.getElementById('track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// var music_list = ...?
const music_list = [
{
    vid: 'video/closure.mp4',
    name: 'Closure',
    artist: 'Hayd',
    music: 'music/Closure.mp3',
    color: '#e3afe3'
},

{
    vid: "video/please don't go.mp4",
    name: "please don't go",
    artist: "beowulf",
    music: "music/please don't go.mp3",
    color: "#d1a484"
},

{
    vid: "video/phantom.mp4",
    name: "Phantom",
    artist: "WayV",
    music: "music/Phantom.mp3",
    color: "#c9203f"
},

{
    vid: "video/let me love u.mp4",
    name: "Let me love u",
    artist: "WayV",
    music: "music/let me love u.mp3",
    color: "#8cccf5"
},

{
    vid: "video/somebody.mp4",
    name: "Somebody That I Used to Know",
    artist: "Gotye",
    music: "music/Somebody That I Used to Know.mp3",
    color: "#f7d3c6"
},

{
    vid: "video/happier (stripped).mp4",
    name: "Happier (Stripped)",
    artist: "Marshmello",
    music: "music/happier (stripped).mp3",
    color: "#f2df4b"
},

{
    vid: "video/the last time we talk to each other.mp4",
    name: "the last time we talk to each other",
    artist: "Zodiac Wave",
    music: "music/the last time we talk to each other.mp3",
    color: "#25458f"
}

]

load_track(track_index);

function addTrack(){
    var track_name = document.getElementById("track-name").value;
    var artist = document.getElementById("artist").value;
    var color = document.getElementById("color-bg").value;

    var new_track = {};

    new_track[name] = String(track_name);
    new_track[artist] = String(artist);
    new_track[color] = String(color);

    music_list.append(new_track);
    
}

function replace(){
    location.replace("index.html");
}

function replaceBack(){
    location.replace("cover.html");
}

function load_track(track_index) {
    clearInterval(updateTimer)
    reset()

    curr_track.src = music_list[track_index].music;
    curr_track.load()

    change_track_video(music_list[track_index].vid)
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    set_bg_color(music_list[track_index].color);
}

function set_bg_color(color) {
    document.body.style.backgroundColor = color;
}

function change_track_video(url) {
    track_art.src = url;
    track_art.play();
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function shuffle() {
    isRandom ? pauseShuffle() : playShuffle();
}

function playShuffle() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseShuffle() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    let current_index = track_index;
    load_track(current_index);
    playTrack()
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }

    load_track(track_index)
    playTrack()
}
function prevTrack(){
    if (track_index > 0){
        track_index -= 1;
    }
    else {track_index = music_list.length - 1;}

    load_track(track_index)
    playTrack()

}
function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    track_art.play()
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    track_art.pause()
}

function changeVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to left';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}

