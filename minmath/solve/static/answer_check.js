import {generate} from "./problem_generator.js";

let score = 0;

function checkAnswer(ans)  {
    // on valid (i.e., integer) input...
    let curProb = document.getElementById("math").textContent;
    let components = curProb.split(/\s+/); // regex split whitespace for numbers
    let sum = 0;
    for (let i = 0; i < components.length; i++) {
        if (!isNaN(parseInt(components[i]))) {
            sum += parseInt(components[i]);
        }
    }
    if (ans == sum) {
        // document.getElementById("score").style.color = "green";
        document.getElementById("math-input").value = "";
        score++;
        document.getElementById("score").textContent = "Score: " + score;
        generate();
    }
    else {
        // document.getElementById("score").style.color = "red";
    }
}

function validate() {
    let ans = document.getElementById("math-input").value;
    if (isNaN(parseInt(ans[ans.length - 1]))) {
        // if last char input is NaN then backtrack
        document.getElementById("math-input").value = ans.substring(0, ans.length - 1);
        // document.getElementById("score").style.color = "red";
    }
    else {
        checkAnswer(ans);
    }
}

document.querySelector("input").addEventListener("input", validate);