function setRanges() {
    // Get the localStorage of user-chosen operation settings
    let ops = JSON.parse(localStorage.getItem("mode1"));
    let opBounds = inputs.map((elem) => elem.value); // strings
    console.log(opBounds);
}

function generateProblem() {
    // Display the math problem
    document.getElementById("math-input").value = "";
    let symbols = {
        "add": " + ",
        "sub": " - ",
        "mult": " x ",
        "divd": " ÷ ",
    }
    let curModes = JSON.parse(localStorage.getItem("mode1")); // get modes set
    let chosenMode = curModes[curModes.length * Math.random() | 0]; // randomize mode for problem
    let nums = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]; // random numbers for problem
    let mathProblem;
    // Depending on mode chosen, make sure answers are nonnegative integers
    if (chosenMode == "sub") {
        mathProblem = Math.max.apply(Math, nums) + symbols[chosenMode] + Math.min.apply(Math, nums);
    }
    else if (chosenMode == "divd") {
        while (Math.max.apply(Math, nums) % Math.min.apply(Math, nums) != 0) {
            nums = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
        }
        mathProblem = Math.max.apply(Math, nums) + symbols[chosenMode] + Math.min.apply(Math, nums);
    }
    else {
        mathProblem = nums[0] + symbols[chosenMode] + nums[1];
    }
    document.getElementById("math").textContent = mathProblem;
}

generateProblem();

export {generateProblem};