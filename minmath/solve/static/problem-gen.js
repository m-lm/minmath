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