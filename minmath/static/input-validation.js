const inputElements = document.querySelectorAll("input");

for (let i = 0; i < inputElements.length; i++) {
    // Prevent pasting/dragging/etc
    inputElements[i].setAttribute("onPaste", "return false");
    inputElements[i].setAttribute("onDragStart", "return false");
    inputElements[i].setAttribute("onDrag", "return false");
    inputElements[i].setAttribute("onDrop", "return false");
    inputElements[i].setAttribute("onCut", "return false");
    inputElements[i].setAttribute("onCopy", "return false");
    inputElements[i].addEventListener("input", (e) => {
        let v = e.target.value;
        for (let j = 0; j < v.length; j++) {
            // If char is not an integer, remove it by index and keep caret position
            if (isNaN(parseInt(v[j]))) {
                e.target.value = v.slice(0, j) + v.slice(j + 1);
                e.target.selectionStart = e.target.selectionEnd = j;
            }
        }
        // Prevent out-of-order ranges
        if (inputElements[i].classList.contains("range")) {
            let ranges = Array.from(document.getElementsByClassName("range"));
            // For each range pair, if out-of-order, apply the correct limit
            if (parseInt(ranges[0].value) > parseInt(ranges[1].value)) {
                e.target.value = (e.target == ranges[0]) ? ranges[1].value : ranges[0].value;
            }
            if (parseInt(ranges[2].value) > parseInt(ranges[3].value)) {
                e.target.value = (e.target == ranges[2]) ? ranges[3].value : ranges[2].value;
            }
            // Prevent preceding 0s
            for (let j = 0; j < ranges.length; j++) {
                if (ranges[j].value[0] == "0" && ranges[j].value[1] != undefined) {
                    e.target.value = "0";
                }
            }
        }
    })
}