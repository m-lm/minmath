function selectMode(id) {
    let mdBtn = document.getElementById(id);
    let btnList;
    mdBtn.style.color = "var(--accent)";
    if (mdBtn.className == "mode-button md1") {
        btnList = document.getElementsByClassName("mode-button md1");
        localStorage.setItem("mode1", id);
    }
    else if (mdBtn.className == "mode-button md2") {
        btnList = document.getElementsByClassName("mode-button md2");
        localStorage.setItem("mode2", id);
    }
    for (let i = 0; i < btnList.length; i++) {
        if (btnList[i].id != id) {
            btnList[i].style.color = "";
        }
    }
}

if (localStorage.getItem("mode1") == "") {
    // if no mode has been previously set or mode has been reset by browser
    localStorage.setItem("mode1", "add");
}

if (localStorage.getItem("mode2") == "") {
    // if no mode has been previously set or mode has been reset by browser
    localStorage.setItem("mode2", "normal");
}

window.addEventListener("load", selectMode(localStorage.getItem("mode1")))
window.addEventListener("load", selectMode(localStorage.getItem("mode2")))