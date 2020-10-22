const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const body = document.querySelector('body');
const title = document.querySelector('#title');
const currentTimeEl = document.querySelector('.current-time');
const remainingTimeEl = document.querySelector('.remaining-time');
const artist = document.querySelector('#artist');
const music = document.querySelector('audio');
const image = document.querySelector('img');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

let allSongs = [
    {
        name : 'verithanam',
        displayName : 'Verithanam',
        composer : 'A R Rahman',
    },
    {
        name : 'sarkar',
        displayName : 'CEO in the house',
        composer : 'A R Rahman',
    },
    {
        name : 'master',
        displayName : 'Vaathi coming',
        composer : 'Anirudh Ravichander',
    },
    {
        name : 'marshmello',
        displayName : 'Alone',
        composer : 'Marshmello',
    }
]

//Current song
let songIndex = 0;

//Checks whether the music is playing
let isPlaying = false;

//Play the music
function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

//Pause the music
function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

function loadMusic(song) {
    title.textContent = song.displayName;
    artist.textContent = song.composer;
    image.src = `img/${song.name}.jpg`;
    music.src = `music/${song.name}.mp3`;
    body.className = song.name;
    playMusic();
}

function playPrevSong() {
    songIndex--;
    if(songIndex < 0){ songIndex = allSongs.length - 1 };
    body.className = '';
    loadMusic(allSongs[songIndex]);
    // playMusic();
}

function playNextSong() {
    songIndex++;
    if(songIndex > allSongs.length - 1){ songIndex = 0 };
    body.className = '';
    loadMusic(allSongs[songIndex]);
    // playMusic();
}

function updateProgressBar(e) {
    if(isPlaying) {
        const { currentTime, duration } = e.srcElement;
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`;

        //Total duration
        var durationMinutes = Math.floor(duration / 60);
        var durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) { durationSeconds = `0${durationSeconds}`};
        var songDuration = `${durationMinutes}.${durationSeconds}`;

        //Current time
        var currentTimeMinutes = Math.floor(currentTime / 60);
        var currentTimeSeconds = Math.floor(currentTime % 60);
        if (currentTimeSeconds < 10) { currentTimeSeconds = `0${currentTimeSeconds}`};
        var songCurrentTime = `${currentTimeMinutes}.${currentTimeSeconds}`;
        if(songCurrentTime) {
            currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
        }

        //Remaining time
        var songRemainingTime = Number.parseFloat(songDuration - songCurrentTime).toFixed(2);
        var integerPart = Math.floor(songRemainingTime);
        var decimalPart = Math.floor((songRemainingTime - integerPart) * 100);
        if (decimalPart < 10) { decimalPart = `0${decimalPart}`};
        if(integerPart && decimalPart) {
            remainingTimeEl.textContent = `${integerPart}:${decimalPart}`;
        }
    }
}

function setProgressBar(e) {
    const { duration } = music;
    music.currentTime = (e.offsetX / e.srcElement.clientWidth) * duration;
}

loadMusic(allSongs[songIndex]);

//add event listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()));
prevBtn.addEventListener('click', playPrevSong);
nextBtn.addEventListener('click', playNextSong);
music.addEventListener('ended', playNextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

