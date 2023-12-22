let score = 0;

function checkAnswer(ans)  {
    // on valid (i.e., integer) input...
    let current_prob = document.getElementById("math").textContent;
    let components = current_prob.split(/\s+/); // regex split whitespace for numbers
    let sum = 0;
    for (let i = 0; i < components.length; i++) {
        if (!isNaN(parseInt(components[i]))) {
            sum += parseInt(components[i]);
        }
    }
    if (ans == sum) {
        document.getElementById("input-status").style.color = "green";
        document.getElementById("input-status").textContent = "Correct!";
        document.getElementById("math-input").value = "";
        score++;
        document.getElementById("score").textContent = "Score: " + score;
    }

    else {
        document.getElementById("input-status").style.color = "red";
        document.getElementById("input-status").textContent = "Incorrect!";
        document.getElementById("math-input").value = "";
    }
}

function validate() {
    let ans = document.getElementById("math-input").value;
    if (isNaN(parseInt(ans))) {
        document.getElementById("math-input").value = "";
        document.getElementById("input-status").style.color = "red";
        document.getElementById("input-status").textContent = "Invalid input!";
    }
    else {
        checkAnswer(ans);
    }
}