import {generate} from "./problem-gen.js";

let score = 0;

function checkAnswer(ans)  {
    // Check that player input is valid (i.e., integer) input
    let curProb = document.getElementById("math").textContent;
    let components = curProb.split(/\s+/); // regex split whitespace for numbers
    let sum = 0;
    for (let i = 0; i < components.length; i++) {
        if (!isNaN(parseInt(components[i]))) {
            sum += parseInt(components[i]);
        }
    }
    // Correct answer
    if (ans == sum) {
        document.getElementById("math-input").value = "";
        score++;
        document.getElementById("score").textContent = "Score: " + score;
        generate();
    }
}

function validate() {
    let ans = document.getElementById("math-input").value;
    if (isNaN(parseInt(ans[ans.length - 1]))) {
        // if last char input is NaN then backtrack
        document.getElementById("math-input").value = ans.substring(0, ans.length - 1);
    }
    else {
        checkAnswer(ans);
    }
}

document.querySelector("input").addEventListener("input", validate);