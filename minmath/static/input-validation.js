const inputElements = document.querySelectorAll("input");

for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener("input", (e) => {
        let v = e.target.value;
        if (isNaN(parseInt(v[v.length - 1]))) {
            // if last char input is NaN then backtrack
            e.target.value = v.substring(0, v.length - 1);
        }
    })
}