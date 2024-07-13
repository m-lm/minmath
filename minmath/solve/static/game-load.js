/*
function streak() {
    // solve within 3 seconds
    // since as of now there is no "wrong" feedback,
    // if you get it correct it just goes next
    let display = document.getElementById("mode-status");
    let count = 0;
    let obsNode = document.getElementById("math");
    const config = { characterData: true };
    const grace = 3; // hard code 3 second grace period
    display.innerHTML = "Streak: " + count;
    let timer = setInterval(() => {
        let time = 0;
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === "characterData") {
                    count++;
                    console.log("npgw/i3s");
                }
            }
        });
        observer.observe(obsNode, config);
        time++;
        if (time >= grace) {
            clearInterval(timer);
        }
        observer.disconnect();
    }, 1000);
}
*/

function timer() {
    let display = document.getElementById("mode-status");
    let prog = document.getElementById("progress-bar");
    let time = Number(localStorage.getItem("duration"));
    const rate = 100 / time;
    let width = 0;
    display.innerHTML = "Time: " + time;
    let timer = setInterval(() => {
        // CARE: weird 1 second delay, so offset by 1; also adjust end condition as needed
        // need to double-check for backend data consistency/veracity
        display.innerHTML = "Time: " + (time - 1); 
        time--;
        width += rate;
        prog.style.width = (100 - width) + "%";
        if (time < 1) {
            clearInterval(timer);
            console.log("Game Finished");
        }
    }, 1000);
}

function zen() {
    document.getElementById("submenu").style.display = "none";
    document.getElementById("menu").style.justifyContent = "center";
}

document.getElementById("math-input").focus();
document.addEventListener("load", zen());

if (localStorage.getItem("mode2") == "timed") {
    document.addEventListener("load", timer());
}