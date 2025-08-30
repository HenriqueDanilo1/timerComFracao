//declarating html tags

const $frac = document.querySelector("#fracTime");
const $timer = document.querySelector("#timerTime");
const $start = document.querySelector("#start");
const $reset = document.querySelector("#reset");
const $pause = document.querySelector("#pause");
const $resume = document.querySelector("#resume");
const $restart = document.querySelector("#restart");
const $string = document.querySelector("#string");
const $iai = document.querySelector("#iai");
const $a = document.querySelector("#a");
const $b = document.querySelector("#b");

// loading functions
$timer.style.display = "none";
$pause.style.display = "none";
$resume.style.display = "none";
$restart.style.display = "none";
$timer.style.animation = "none";

//convert functions
function frac2ms(a, b) {
  return parseInt((a / b) * 6000);
}

function ms2time(ms) {
  const m = parseInt(ms / 6000)
    .toString()
    .padStart(2, "0");

  const s = (parseInt(ms / 100) - m * 60).toString().padStart(2, "0");

  ms -= m * 6000 + s * 100;

  $timer.innerHTML = `${m}:${s}.${ms.toString().padStart(2, "0")}`;
}

function simplifier(a, b) {
  if (a > b) {
    for (let i = a; i > 0; i--) {
      if (a % i == 0 && b % i == 0) {
        a /= i;
        b /= i;
      }
    }
  } else {
    for (let i = b; i > 0; i--) {
      if (a % i == 0 && b % i == 0) {
        a /= i;
        b /= i;
      }
    }
  }

  let r = [a, b];
  return r;
}

//timer functions
let ms;
let counting;
let startA;
let startB;

function start(isContinue) {
  if ($a.value == 22 && $b.value == 13) {
    new Audio("audio/monday.m4a").play();
    document.querySelector("#nihaonigga").style.animation = "growUp 10s linear";
    document.querySelector("#nihaonigga").style.height = "700px";
    setTimeout(() => {
      document.querySelector("#nihaonigga").style.animation = "";
      document.querySelector("#nihaonigga").style.height = "0";
    }, 15000);
    return;
  }
  const a = Number($a.value);
  const b = Number($b.value);
  if (!isContinue) {
    startA = a;
    startB = b;
  }
  if (a < 0 || b <= 0) {
    return alert("animal");
  }
  ms = frac2ms(a, b);
  $frac.style.display = "none";
  $string.style.display = "none";
  $timer.style.display = "";
  counting = setInterval(() => {
    if (ms >= 0) {
      ms2time(ms);
      ms--;
    } else {
      clearInterval(counting);
      $timer.style.animation = "";
      $pause.style.display = "none";
      $restart.style.display = "";
    }
  }, 10);
  $timer.style.animation = "none";
  $start.style.display = "none";
  $resume.style.display = "none";
  $pause.style.display = "";
}
function pause() {
  clearInterval(counting);
  $pause.style.display = "none";
  $resume.style.display = "";
  $timer.style.display = "none";
  if ($iai.checked) {
    ms = ms - (ms % 100);
  }
  let a = ms;
  let b = 6000;
  let r = simplifier(a, b);
  a = r[0];
  b = r[1];
  $a.value = a;
  $b.value = b;
  $frac.style.display = "";
  $string.style.display = "";
}
function reset() {
  clearInterval(counting);
  $pause.style.display = "none";
  $resume.style.display = "none";
  $timer.style.display = "none";
  $restart.style.display = "none";
  $start.style.display = "";
  $frac.style.display = "";
  $string.style.display = "";
  $a.value = 1;
  $b.value = 1;
}
function restart() {
  $restart.style.display = "none";
  ms = frac2ms(startA, startB);
  $frac.style.display = "none";
  $string.style.display = "none";
  $timer.style.display = "";
  counting = setInterval(() => {
    if (ms >= 0) {
      ms2time(ms);
      ms--;
    } else {
      clearInterval(counting);
      $timer.style.animation = "";
      $pause.style.display = "none";
      $restart.style.display = "";
    }
  }, 10);
  $timer.style.animation = "none";
  $start.style.display = "none";
  $resume.style.display = "none";
  $pause.style.display = "";
}
