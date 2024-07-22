function setRanges() {
    // Get the localStorage of user-chosen operation settings
    let ops = JSON.parse(localStorage.getItem("mode1"));
    let opBounds = inputs.map((elem) => elem.value); // strings
    console.log(opBounds);
}

function generateProblem() {
    // Display the math problem
    document.getElementById("math-input").value = "";
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    let curMode;
    let mathProblem = num1 + " + " + num2;
    document.getElementById("math").textContent = mathProblem;
}

generateProblem();

export {generateProblem};