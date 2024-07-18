function selectMode(id) {
    let mdBtn = document.getElementById(id);
    let btnList = document.getElementsByClassName(mdBtn.className);

    // Toggle-like mechanism
    if (mdBtn.style.color == "var(--accent)" && mdBtn.className == "mode-button md1") {
        // Turn off
        mdBtn.style.color = "var(--txt)";
    }
    else {
        // Turn on
        if (mdBtn.className == "mode-button md1") {
            localStorage.setItem("mode1", id);
        }
        else if (mdBtn.className == "mode-button md2") {
            localStorage.setItem("mode2", id);
            setDuration(id); 
        }
        mdBtn.style.color = "var(--accent)";
    }

    // Except for operand selection, settings are exclusive
    for (let i = 0; i < btnList.length; i++) {
        if (btnList[i].id != id && btnList[i].className != "mode-button md1") {
            btnList[i].style.color = "var(--txt)";
        }
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