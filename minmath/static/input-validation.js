const inputElements = document.querySelectorAll("input");

for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].setAttribute("onPaste", "return false");
    inputElements[i].setAttribute("onDragStart", "return false");
    inputElements[i].setAttribute("onDrag", "return false");
    inputElements[i].setAttribute("onDrop", "return false");
    inputElements[i].setAttribute("onCut", "return false");
    inputElements[i].setAttribute("onCopy", "return false");
    inputElements[i].addEventListener("input", (e) => {
        let v = e.target.value;
        for (let j = 0; j < v.length; j++) {
            if (isNaN(parseInt(v[j]))) {
                let newVal = v.slice(0, j) + v.slice(j + 1);
                e.target.value = newVal;
                e.target.selectionStart = e.target.selectionEnd = j;
            }
        }
    })
}