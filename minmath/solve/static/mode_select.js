function select_mode(id) {
    let act_btn = document.getElementById(id);
    act_btn.style.color = "var(--accent)";
    localStorage.setItem("mode", id);
    if (act_btn.className == "mode-button md1") {
        let btn_list = document.getElementsByClassName("mode-button md1");
        let num_btns = btn_list.length;
        for (let i = 0; i < num_btns; i++) {
            if (btn_list[i].id != id) {
                btn_list[i].style.color = "";
            }
        }
    }
    else if (act_btn.className == "mode-button md2") {
        let btn_list = document.getElementsByClassName("mode-button md2");
        let num_btns = btn_list.length;
        for (let i = 0; i < num_btns; i++) {
            if (btn_list[i].id != id) {
                btn_list[i].style.color = "";
            }
        }
    }
}

if (localStorage.getItem("mode") == "") {
    // if no mode has been previously set or mode has been reset by browser
    localStorage.setItem("mode", "add");
}

window.addEventListener("load", select_mode(localStorage.getItem("mode")))