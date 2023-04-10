const video = document.querySelector("#videos");
const controls = document.querySelector(".controls");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progressBar = document.getElementById("progress");
const timeStamp = document.getElementById("timeStamp");
const playIcon = play.querySelector(".fa");

// if js doesn't load
video.removeAttribute("controls");
controls.style.visibility = "visible";

//change icon by using play and pause state and chaging class for font awesome
const changeState = function (state) {
  const addVal = state === "play" ? "pause" : "play";
  const removeVal = state === "play" ? "play" : "pause";
  playIcon.classList.remove(`fa-${removeVal}`);
  playIcon.classList.add(`fa-${addVal}`);
};

//function to play and pause the video
const playPauseVideo = function () {
  if (video.paused) {
    changeState("play");
    video.play();
  } else {
    changeState("pause");
    video.pause();
  }
};

//function to abort the video
const stopVideo = function () {
  changeState("pause");
  video.currentTime = 0;
  video.pause();
};

//function to set the timeStamp and progress bar
const setTime = function () {
  const minutes = Math.floor(video.currentTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(video.currentTime - +minutes * 60)
    .toString()
    .padStart(2, "0");
  timeStamp.textContent = `${minutes}:${seconds}`;
  const inputPosition = Math.floor((video.currentTime / video.duration) * 100);
  progressBar.value = inputPosition;
};

//function to set current time and  progress bar at random places where user clicks
const setBar = function () {
  const inputVal = progressBar.value;
  const currTime = Math.floor((inputVal * video.duration) / 100);
  progressBar.value = inputVal;
  video.currentTime = currTime;
};

//eventlisteners for video player app
play.addEventListener("click", playPauseVideo);
stop.addEventListener("click", stopVideo);
video.addEventListener("timeupdate", setTime);
video.addEventListener("ended", stopVideo);
video.addEventListener("click", playPauseVideo);
progressBar.addEventListener("input", setBar);
