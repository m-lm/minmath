const startTime = new Date().getTime();

function timer() {
    // Timer display for timed mode
    let display = document.getElementById("mode-status");
    let time = Number(localStorage.getItem("duration"));
    display.innerHTML = "Time: " + time;
    // let testb = 0;
    let timer = setInterval(() => {
        // CARE: weird 1 second delay, so offset by 1; also adjust end condition as needed
        display.innerHTML = "Time: " + (time - 1); 
        // testb++;
        // console.log("sec_timer (focused): ", testb);
        time--;
        if (time < 1) {
            clearInterval(timer);
            gameEnd();
        }
    }, 1000);
}

function progBar() {
    // Progress bar for timed mode
    let prog = document.getElementById("progress-bar");
    const time = Number(localStorage.getItem("duration"));
    const rate = 100 / time;
    let width = 0;
    // let testb = 0;
    prog.style.visibility = "visible";
    let bar = setInterval(() => {
        let timeLapsed = new Date().getTime() - startTime; // Use this if user tab switches to update bar
        // width += rate; where r=10/t
        width = rate * (timeLapsed / 1000);
        // testb++;
        // console.log("width: ", width, "sec_bar (focused): ", testb/10);
        prog.style.width = (100 - width) + "%";
        if (width >= 100) {
            clearInterval(bar);
            prog.style.width = 0 + "%"; // force clear when time's up
        }
    }, 100);
}

function gameEnd() {
    // Switch to results after game
    document.getElementById("performance").textContent = document.getElementById("score").textContent = document.getElementById("score-submission").value;
    document.getElementById("score-form").submit();
    document.getElementById("session").classList.add("hide");
    document.getElementById("results").classList.remove("hide");
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