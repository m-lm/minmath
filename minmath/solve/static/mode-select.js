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

function updOperations(id, del = false) {
    // Update operations for mode 1 in particular, void return
    let newOps = new Set(JSON.parse(localStorage.getItem("mode1")));
    del ? newOps.delete(id) : newOps.add(id); // if del is true, delete id, else add it
    newOps = JSON.stringify(Array.from(newOps));
    localStorage.setItem("mode1", newOps);
}

function modeParse(id) {
    // Parse incoming id argument to validate format
    // Then pass into selectMode as string
    // This is for localStorage values of different types (TypeScript would be great here)
    if (id.indexOf("[") > -1 && id.indexOf("]") > -1) {
        let pid = JSON.parse(id);
        for (let i = 0; i < pid.length; i++) {
            selectMode(pid[i]);
        }
    }
    else {
        selectMode(id);
    }
}

function selectMode(id) {
    // given id argument should always be string
    let mdBtn = document.getElementById(id);
    let btnList = document.getElementsByClassName(mdBtn.className);
    // Toggle-like mechanism
    if (mdBtn.classList.contains("active") && mdBtn.classList.contains("md1")) {
        // Turn off
        updOperations(id, true);
        mdBtn.classList.remove("active");
        // Prevent deactivation if last active operand setting
        if (!checkEmpty()) {
            mdBtn.classList.add("active");
            updOperations(id);
        }
    }
    else {
        // Turn on
        if (mdBtn.classList.contains("md1")) {
            updOperations(id);
        }
        else if (mdBtn.classList.contains("md2")) {
            localStorage.setItem("mode2", id);
            setDuration(id); 
            for (let i = 0; i < btnList.length; i++) {
                // Deactivate other settings
                if (btnList[i].id != id) {
                    btnList[i].classList.remove("active");
                }
            }
        }
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

function setOperations() {
    // Get the localStorage of user-chosen operation settings
    const initLow = 0;
    const initHigh = 100;
    let inputs = Array.from(document.getElementsByClassName("range"));
    // Set placeholder if inputs are empty
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            switch(i % 2) {
                case 0:
                    inputs[i].placeholder = initLow;
                    break;
                case 1:
                    inputs[i].placeholder = initHigh;
                    break;
            }
        }
    }
    let opBounds = inputs.map((elem) => elem.value);
    // console.log(opBounds);
}

// if no modes has been previously set or mode has been reset by browser
if (localStorage.getItem("mode1") == null) {
    const initOps = JSON.stringify(Array.from(new Set(["add"])));
    localStorage.setItem("mode1", initOps);
}

if (localStorage.getItem("mode2") == null) {
    localStorage.setItem("mode2", "timed");
}

if (localStorage.getItem("bounds") == null) {
}

// Load local browser settings
window.addEventListener("load", modeParse(localStorage.getItem("mode1")));
window.addEventListener("load", modeParse(localStorage.getItem("mode2")));
window.addEventListener("load", setOperations());