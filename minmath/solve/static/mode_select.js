function select_mode(id) {
    act_btn = document.getElementById(id);
    act_btn.style.color = "var(--name-hov)";
    localStorage.setItem("mode", id);
    btn_list = document.getElementsByClassName("mode-button");
    num_btns = btn_list.length;
    for (let i = 0; i < num_btns; i++) {
        if (btn_list[i].id != id) {
            btn_list[i].style.color = "";
        }
    }
}
window.addEventListener("load", select_mode(localStorage.getItem("mode")))