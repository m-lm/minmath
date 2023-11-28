function generate() {
    // const > let > var for variable declarations
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    let mathProblem = num1 + " + " + num2 + " = ";
    document.getElementById("math").innerHTML = mathProblem;
}

generate();