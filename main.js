//declarating html tags

const $frac = document.querySelector("#fracTime");
const $timer = document.querySelector("#timerTime");
const $start = document.querySelector("#start");
const $reset = document.querySelector("#reset");
const $pause = document.querySelector("#pause");
const $resume = document.querySelector("#resume");
const $iai = document.querySelector("#iai");
const $a = document.querySelector("#a");
const $b = document.querySelector("#b");

// loading functions
$timer.style.display = "none";
$pause.style.display = "none";
$resume.style.display = "none";

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

function start() {
  const a = Number($a.value);
  const b = Number($b.value);
  if (a == 0 || b == 0) {
    return alert("animal");
  }
  ms = frac2ms(a, b);
  $frac.style.display = "none";
  $timer.style.display = "";
  counting = setInterval(() => {
    if (ms >= 0) {
      ms2time(ms);
      ms--;
    } else {
      return clearInterval(counting);
    }
  }, 10);
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
}

function reset() {
  clearInterval(counting);
  $pause.style.display = "none";
  $start.style.display = "";
  $frac.style.display = "";
  $timer.style.display = "none";
  $a.value = 1;
  $b.value = 1;
}
