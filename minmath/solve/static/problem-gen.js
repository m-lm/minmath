function generate() {
    // Display the math problem
    document.getElementById("math-input").value = "";
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    let curMode = localStorage.getItem("mode1");
    let mathProblem = num1 + " + " + num2;
    document.getElementById("math").textContent = mathProblem;
}

generate();

export {generate};