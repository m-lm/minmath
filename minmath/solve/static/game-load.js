function timer() {
    // Timer display for timed mode
    let display = document.getElementById("mode-status");
    let time = Number(localStorage.getItem("duration"));
    display.innerHTML = "Time: " + time;
    let timer = setInterval(() => {
        // CARE: weird 1 second delay, so offset by 1; also adjust end condition as needed
        // double-check for backend
        display.innerHTML = "Time: " + (time - 1); 
        time--;
        if (time < 1) {
            clearInterval(timer);
        }
    }, 1000);
}

function progBar() {
    // Progress bar for timed mode
    let prog = document.getElementById("progress-bar");
    const time = Number(localStorage.getItem("duration"));
    const rate = 10 / time;
    let width = 0;
    prog.style.visibility = "visible";
    let bar = setInterval(() => {
        width += rate;
        prog.style.width = (100 - width) + "%";
        if (width >= 100) {
            clearInterval(bar);
            prog.style.width = 0 + "%"; // force clear when time's up
        }
    }, 100);
}

function gameView() {
    // Declutter menu bar
    document.getElementById("submenu").style.display = "none";
    document.getElementById("menu").style.justifyContent = "center";
}

// Load on game start
document.getElementById("math-input").focus();
document.addEventListener("load", gameView());

if (localStorage.getItem("mode2") == "timed") {
    document.addEventListener("load", timer());
    document.addEventListener("load", progBar());
}