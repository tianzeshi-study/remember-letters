// 检查是否按下回车键
function checkEnter(event) {
    if (event.keyCode === 13) { // 检查是否按下回车键
        userInput = getUserInput();
        // result = compareInput(userInput);
        evaluatePython(userInput);
    }
}


function getUserInput() {
    const userInput = document.getElementById('code').value;
    if (userInput.trim() !== '') { // 检查输入是否非空
        // compareInput(userInput);
        // playSound(400, 2);
        document.getElementById('code').value = ''; // 清空输入框

    }
    return userInput
}

