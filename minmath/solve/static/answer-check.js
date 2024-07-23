import {generateProblem} from "./problem-gen.js";

let score = 0;

function getSoln() {
    // Validate player's input answer and return true answer
    let components = document.getElementById("math").textContent.split(/\s+/); // regex split whitespace for numbers
    let sum = 0;
    for (let i = 0; i < components.length; i++) {
        if (!isNaN(parseInt(components[i]))) {
            sum += parseInt(components[i]);
        }
    }
    return sum;
}

function validateAnswer() {
    let playerAns = document.getElementById("math-input").value;
    let correctAns = getSoln();
    if (playerAns == correctAns) {
        document.getElementById("math-input").value = "";
        score++;
        document.getElementById("score").textContent = "Score: " + score;
        generateProblem();
    }
}

document.querySelector("input").addEventListener("input", validateAnswer);