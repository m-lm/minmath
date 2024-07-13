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

if (localStorage.getItem("mode2") == "timed") {
    document.addEventListener("load", timer());
}