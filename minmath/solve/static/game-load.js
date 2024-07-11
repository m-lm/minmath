function timer() {
    let display = document.getElementById("countdown");
    let time = Number(localStorage.getItem("duration"));
    display.innerHTML = "Time: " + time;
    let timer = setInterval(() => {
        // CARE: weird 1 second delay, so offset by 1; also adjust end condition as needed
        // need to double-check for backend data consistency/veracity
        display.innerHTML = "Time: " + (time - 1); 
        time--;
        if (time < 1) {
            clearInterval(timer);
            console.log("Game Finished");
        }
    }, 1000);
}

document.getElementById("math-input").focus();
document.addEventListener("load", timer());