function select_mode(id) {
    let mdBtn = document.getElementById(id);
    mdBtn.style.color = "var(--accent)";
    localStorage.setItem("mode", id);
    if (mdBtn.className == "mode-button md1") {
        let btnList = document.getElementsByClassName("mode-button md1");
        for (let i = 0; i < btnList.length; i++) {
            if (btnList[i].id != id) {
                btnList[i].style.color = "";
            }
        }
    }
    else if (mdBtn.className == "mode-button md2") {
        let btnList = document.getElementsByClassName("mode-button md2");
        for (let i = 0; i < btnList.length; i++) {
            if (btnList[i].id != id) {
                btnList[i].style.color = "";
            }
        }
    }
}

if (localStorage.getItem("mode") == "") {
    // if no mode has been previously set or mode has been reset by browser
    localStorage.setItem("mode", "add");
}

window.addEventListener("load", select_mode(localStorage.getItem("mode")))