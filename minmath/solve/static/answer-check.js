import {generateProblem} from "./problem-gen.js";

let score = 0;

function checkInput(ans) {
    // Prevent weird input; also return Number type sum
    if (isNaN(parseInt(ans[ans.length - 1]))) {
        // if last char input is NaN then backtrack
        document.getElementById("math-input").value = ans.substring(0, ans.length - 1); // copied value assigned to mutable value from element directly
    }
     // Check that player input is valid (i.e., integer) input
    let curProblem = document.getElementById("math").textContent;
    let components = curProblem.split(/\s+/); // regex split whitespace for numbers
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
    let correctAns = checkInput(playerAns);
    if (playerAns == correctAns) {
        document.getElementById("math-input").value = "";
        score++;
        document.getElementById("score").textContent = "Score: " + score;
        generateProblem();
    }
}

document.querySelector("input").addEventListener("input", validateAnswer);