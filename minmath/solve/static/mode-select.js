function checkEmpty() {
    // Returns true if not empty
    let btnList = document.getElementsByClassName("md1");
    for (let i = 0; i < btnList.length; i++) {
        if (btnList[i].classList.contains("active")) {
            return true;
        }
    }
    return false;
}

function selectMode(id) {
    let mdBtn = document.getElementById(id);
    let btnList = document.getElementsByClassName(mdBtn.className);
    // Toggle-like mechanism
    if (mdBtn.classList.contains("active") && mdBtn.classList.contains("md1")) {
        // Turn off
        mdBtn.classList.remove("active");
    }
    else {
        // Turn on
        if (mdBtn.classList.contains("md1")) {
            localStorage.setItem("mode1", id);
        }
        else if (mdBtn.classList.contains("md2")) {
            localStorage.setItem("mode2", id);
            setDuration(id); 
        }
        mdBtn.classList.add("active");
    }
    // Except for operand selection, settings are exclusive
    for (let i = 0; i < btnList.length; i++) {
        if (btnList[i].id != id && !btnList[i].classList.contains("md1")) {
            btnList[i].classList.remove("active");
        }
    }
    // Prevent deactivation if last active operand setting
    if (!checkEmpty()) {
        mdBtn.classList.add("active");
    }
}

function selectTime(t) {
    localStorage.setItem("duration", t);
}

function setDuration(id) {
    // Prettify duration setting dropdown
    let dur = document.getElementById("duration");
    if (id == "timed") {
        dur.value = localStorage.getItem("duration");
        dur.style.pointerEvents = "inherit";
        dur.style.appearance = "unset";
        dur.style.boxShadow = "0px 2px 0px 0px var(--accent)";
    }
    else {
        dur.value = "inf";
        dur.style.pointerEvents = "none";
        dur.style.appearance = "none";
        dur.style.boxShadow = "none";
    }
}

// Load local browser settings
window.addEventListener("load", selectMode(localStorage.getItem("mode1")));
window.addEventListener("load", selectMode(localStorage.getItem("mode2")));

// if no modes has been previously set or mode has been reset by browser
if (localStorage.getItem("mode1") == null) {
    localStorage.setItem("mode1", "add");
}

if (localStorage.getItem("mode2") == null) {
    localStorage.setItem("mode2", "timed");
}