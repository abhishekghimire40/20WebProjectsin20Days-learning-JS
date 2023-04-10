const media = document.querySelector("video");
const controls = document.querySelector(".controls");
const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const fwd = document.querySelector(".fwd");
const rwd = document.querySelector(".rwd");
const timerWrapper = document.querySelector(".timer");
const timerBar = document.querySelector(".timer div");
const timerSpan = document.querySelector(".timer span");

media.removeAttribute("controls");
controls.style.visibility = "visible";

//function to play and pause media
const playPauseMedia = function () {
  //if rewind or forwad button is  pressed
  rwd.classList.remove("active");
  fwd.classList.remove("active");
  clearInterval(intervalFwd);
  clearInterval(intervalRwd);

  //check if media is paused of playing
  if (media.paused) {
    play.setAttribute("data-icon", "u");
    media.play();
  } else {
    play.setAttribute("data-icon", "P");
    media.pause();
  }
};

//function to stop the media
const stopMedia = function () {
  //if rewind or forward button is pressed
  rwd.classList.remove("active");
  fwd.classList.remove("active");
  clearInterval(intervalFwd);
  clearInterval(intervalRwd);

  //stop the media and take it to 0 seconds or start
  media.currentTime = 0;
  media.pause();
  play.setAttribute("data-icon", "P");
};

//for setting iterval to forward or rewind the video
let intervalFwd, intervalRwd;

//rewind the video
const windBackward = function () {
  if (media.currentTime <= 3) {
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    stopMedia();
  } else {
    media.currentTime -= 3;
    play.setAttribute("data-icon", "u");
  }
};

// forward video by 3 secs
const windForward = function () {
  if (media.currentTime >= media.duration - 3) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    stopMedia();
  } else {
    media.currentTime += 3;
    play.setAttribute("data-icon", "u");
  }
};

const mediaBackward = function () {
  clearInterval(intervalFwd);
  fwd.classList.remove("active");

  if (rwd.classList.contains("active")) {
    clearInterval(intervalRwd);
    rwd.classList.remove("active");
    media.play();
  } else {
    rwd.classList.add("active");
    media.play();
    intervalRwd = setInterval(windBackward, 200);
  }
};

const mediaForward = function () {
  clearInterval(intervalRwd);
  rwd.classList.remove("active");

  if (fwd.classList.contains("active")) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add("active");
    media.play();
    intervalFwd = setInterval(windForward, 200);
  }
};

//display time elapsed and also display the barlength as the video progresses
const setTime = function () {
  const minutes = Math.floor(media.currentTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(media.currentTime - minutes * 60)
    .toString()
    .padStart(2, "0");
  timerSpan.textContent = `${minutes}:${seconds}`;
  const barlength =
    timerWrapper.clientWidth * (media.currentTime / media.duration);
  timerBar.style.width = `${barlength}px`;
};

//play video at random positions
const playAt = function (e) {
  // const position = Math.floor(e.clientX - this.getBoundingClientRect().left);
  const position = e.offsetX;
  media.currentTime = Math.floor(
    (position * media.duration) / timerWrapper.clientWidth
  );
  timerBar.style.width = `${position}px`;
};

play.addEventListener("click", playPauseMedia);
stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);
rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);
media.addEventListener("timeupdate", setTime);
timerWrapper.addEventListener("click", playAt);
