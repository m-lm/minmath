function generateNums() {
    // Generate nums given stored operand ranges
    let ranges = JSON.parse(localStorage.getItem("bounds"));
    ranges = ranges.map(e => parseInt(e));
    let range1 = ranges.slice(0, 2);
    let max1 = Math.floor(Math.max.apply(Math, range1));
    let min1 = Math.ceil(Math.min.apply(Math, range1));
    let range2 = ranges.slice(2, 4);
    let max2 = Math.floor(Math.max.apply(Math, range2));
    let min2 = Math.ceil(Math.min.apply(Math, range2));
    let nums = [Math.floor(Math.random() * (max1 - min1 + 1) + min1), Math.floor(Math.random() * (max2 - min2 + 1) + min2)];
    return nums;
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
    let mathProblem;
    let nums = generateNums();
    let chosenMode = curModes[curModes.length * Math.random() | 0]; // randomize mode for problem
    // Depending on mode chosen, make sure answers are nonnegative integers
    if (chosenMode == "sub") {
        mathProblem = Math.max.apply(Math, nums) + symbols[chosenMode] + Math.min.apply(Math, nums);
    }
    else if (chosenMode == "divd") {
        // If mode is divide, reroll a different mode to prevent divide by zero conflicts
        if (nums.includes(0)) {
            chosenMode = (curModes.length > 1) ? curModes.filter(x => x != "divd")[(curModes.length - 1) * Math.random() | 0] : ["add","sub","mult"][3 * Math.random() | 0]; 
        }
        else {
            // CARE: 0 % 0 is undefined/NaN, see division by zero
            while (Math.max.apply(Math, nums) % Math.min.apply(Math, nums) != 0) {
                nums = generateNums();
            }
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