function generate() {
    // const > let > var for variable declarations
    document.getElementById("math-input").value = ""; // clear input field
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    let mathProblem = num1 + " + " + num2;
    document.getElementById("math").textContent = mathProblem;
}

generate();

export {generate};