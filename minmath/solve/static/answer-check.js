import {generateProblem} from "./problem-gen.js";

let score = 0;

function getSoln() {
    // Validate player's input answer and return true answer
    let components = document.getElementById("math").textContent.split(/\s+/); // regex split whitespace for numbers
    let operation = components[1]; // operation sign
    let ans = parseInt(components[0]); // first number
    let secondNum = parseInt(components[2]); // second number

    // Operate on second number accordingly
    switch (operation) {
        case "+":
            ans += secondNum;
            break;
        case "-":
            ans -= secondNum;
            break;
        case "x":
            ans *= secondNum;
            break;
        case "÷":
            ans /= secondNum;
            break;
        default:
            console.log("switch error");
    }

    return ans;
}

function validateAnswer() {
    let playerAns = parseInt(document.getElementById("math-input").value);
    let correctAns = getSoln();
    if (playerAns === correctAns) { // "" == 0 is true? gonna use TypeScript after this project...
        document.getElementById("math-input").value = "";
        score++;
        document.getElementById("score").textContent = "Score: " + score;
        generateProblem();
    }
}

document.querySelector("input").addEventListener("input", validateAnswer);