//alert("警报：请注意！");
const resultDiv = document.getElementById('result');
let words = []; // Array to store words from text file
let currentIndex = 0; // Index to keep track of current word being read
let answer = [];
let inputHistory = [];
let isWord = [];
let randomWords = [];
const preferenceCheckbox = document.getElementById('preferenceCheckbox');
const saveHistory = document.getElementById('saveHistory');
// 创建 AudioContext 对象
var audioContext = new(window.AudioContext || window.webkitAudioContext)();

let thisTrail = {};
// 检查本地存储中是否已存在列表
let savedHistory = localStorage.getItem('savedHistory');

// 如果本地存储中不存在列表，则创建一个空数组
if (!savedHistory) {
    savedHistory = [];
} else {
    // 如果存在，则从本地存储中加载列表数据
    savedHistory = JSON.parse(savedHistory);
}
const lastTrail = savedHistory[savedHistory.length - 1];
// 添加项目到列表
function addItemToList(item) {
    savedHistory.push(item);
    // 更新本地存储
    localStorage.setItem('savedHistory', JSON.stringify(savedHistory));
}

// 检查是否按下回车键
function checkEnter(event) {
    if (event.keyCode === 13) { // 检查是否按下回车键
        userInput = getUserInput();
        result = compareInput(userInput);
        // setTimeout(readNextWord(), 2000);
        // readNextWord();
        // start();
        // playSound(300 ,2 );
        // start();

    }
}

// 播放指定频率的音频，带有音量参数
function playSound(frequency, volume) {
    // 创建 OscillatorNode
    var oscillator = audioContext.createOscillator();
    // 创建 GainNode
    var gainNode = audioContext.createGain();
    // 设置频率
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    // 设置音量
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    // 连接 OscillatorNode 到 GainNode
    oscillator.connect(gainNode);
    // 连接 GainNode 到扬声器
    gainNode.connect(audioContext.destination);
    // 开始播放
    oscillator.start();
    // 停止播放（持续时间）
    oscillator.stop(audioContext.currentTime + 0.2); // 1 * 0.2 秒后停止播放
}

// window.onload = function() {
function start() {
    loadTextFile();
}

// Function to load text file and store words in memory
function loadTextFile() {
    fetch('word.txt') // Replace 'word.txt' with your text file path
    .then(response => response.text())
    .then(text => {
        words = text.trim().split(/\s+/); // Split text into words
        readNextWord(); // Start reading the first word
    })
    .catch(error => console.error('Error loading text file:', error));
}

// Function to compare user input with current word
function compareInput(input) {
    const currentWord = words[currentIndex - 1];
    // const result = (input.trim().toLowerCase() === currentWord.toLowerCase()) ? 'Correct!' : 'Incorrect!';
    const result = (input.trim().toLowerCase() === currentWord.toLowerCase()) ? true : currentWord;
    // speakText(result);
    // const sound = (input.trim().toLowerCase() === currentWord.toLowerCase()) ? 640 : 240;
    // playSound(500 , 2 );
    inputHistory[currentIndex - 1] = input;
    resultDiv.textContent = result;
    // if (result == 'Correct!') {
    if (result == true) {
        console.log(currentIndex - 1);
        playSound(700, 0.75);
        answer[currentIndex - 1] = true;
        setTimeout(function () {
            readNextWord()
        }, 750);
        // readNextWord();
    } else {
        playSound(200, 2);
        console.log("回答错误" + currentIndex);
        answer[currentIndex - 1] = false;
        setTimeout(function () {
            if (preferenceCheckbox.checked) {
                readNextWord();
            } else {
                return;
            }
        }, 1000);
        // readNextWord();
    };
    return result;
}

// Function to speak text using browser's TTS API
function speakText(text, play) {
    const utterance = new SpeechSynthesisUtterance(text);
    // const letters =text.split('').join(' ');
    // const utterance = new SpeechSynthesisUtterance(letters);
    utterance.rate = 1.5; // 将语速设置为原来的两倍
    utterance.onend = function () {
        if (currentIndex <= words.length) {
            getUserInput();
            if (play == true) {
                getUserInput();
                playSound(450, 1.5);
                console.log("单词时长：" + utterance.duration + " 秒");
            } else {
                // console.log("not play ");
                console.log("字母时长：" + utterance.duration + " 秒");
            }
            // Wait for user input after speaking the word
            // userInput = getUserInput();
            // compareInput(userInput);
        }
    };
    speechSynthesis.speak(utterance);
}

// Function to get user input
function getUserInput() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== '') { // 检查输入是否非空
        // compareInput(userInput);
        // playSound(400, 2);
        document.getElementById('userInput').value = ''; // 清空输入框

    }
    return userInput
}

function readNextWord() {
    if (currentIndex < words.length) {
        const letters = words[currentIndex].split('').join(' ');
        // speakText(letters, false);
        playTextWithTone(letters);
        try {
            // speakText(words[currentIndex], true);
            if (!lastTrail) {
                const randomNumber = Math.floor(Math.random() * 3);
                switch (randomNumber) {
                case 3:
                    // playSound(350, 1);
                    // speakText("emmmmmmm", true);
                    isWord[currentIndex] = null;
                    break;
                case 1:
                    // speakText(words[currentIndex], true);
                    speakText(words[currentIndex], false);
                    isWord[currentIndex] = true;
                    // console.log("随机单词: ", randomWord);
                    break;
                case 0:
                    const randomSequence = generateRandomLetterSequence(words[currentIndex].length);
                    // speakText(randomSequence, true);
                    speakText(randomSequence, false);
                    console.log("随机字母序列: ", randomSequence);
                    isWord[currentIndex] = false;
                    randomWords[currentIndex] = randomSequence;
                    break;
                default:
                    console.log("未知操作");
                    break;
                }
            } else {
                // isWord[currentIndex - 1]  =  lastTrail['isWord'][currentIndex - 1] === true ? false : true;
                if (lastTrail['isWord'][currentIndex] !== null) {
                    // isWord[currentIndex] = !lastTrail['isWord'][currentIndex];
                    isWord[currentIndex] = lastTrail['isWord'][currentIndex] === true ? false : null;

                    console.log("exist  last trail");
                    console.log("lastTrail is word :" + lastTrail['isWord'][currentIndex]);
                    console.log("thisTrail is word :" + isWord[currentIndex]);
                    if (isWord[currentIndex] == null) {
                        // speakText(words[currentIndex], true);
                        // speakText(words[currentIndex], false);
                    } else {
                        const randomSequence = generateRandomLetterSequence(words[currentIndex].length);
                        // speakText(randomSequence, true);
                        speakText(randomSequence, false);
                        console.log("随机字母序列: ", randomSequence);
                        // isWord[currentIndex - 1] = false;
                        randomWords[currentIndex] = randomSequence;

                    }
                } else {
                    speakText(words[currentIndex], false);
                    isWord[currentIndex] = true;
                }
            }

        } catch (error) {
            console.log(error.message);
        }
        finally {
            // playSound(450, 1.5);
        }
        currentIndex++;
        // userInput = getUserInput();
        // compareInput(userInput);

    } else {
        resultDiv.textContent = "End of text.";
        thisTrail['words'] = words;
        thisTrail['answer'] = answer;
        thisTrail['inputHistory'] = inputHistory;
        thisTrail['isWord'] = isWord;
        thisTrail['randomWords'] = randomWords;
        if (saveHistory.checked) {
            try {
                addItemToList(thisTrail);
            } catch (error) {
                console.log('An error occurred:', error.message);
            }
            resultDiv.textContent = "saved successfully .";
            console.log("successfully saved!");
        } else {
            console.log("history not saved");
        }
    }
}

// 生成随机字母序列
function generateRandomLetterSequence(length) {
    // const letters = "abcdooaaiiieeeuuuaaaeeeiiiooouuehilmnoprst";
    // const letters = "1234";
    const letters = "aehinorst";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters[randomIndex];
    }
    return result;
}

function outputHistory() {
    const textContent = localStorage.getItem("savedHistory");

    // 创建一个新的 Blob 对象，将文本内容放入其中
    const blob = new Blob([textContent], {
        type: "text/plain"
    });

    // 创建一个下载链接
    const downloadLink = document.createElement("a");
    downloadLink.download = "output.json"; // 下载文件的名称
    downloadLink.href = window.URL.createObjectURL(blob);

    // 点击链接以下载文件
    downloadLink.click();

}

function playTextWithTone(text) {
    // Web Speech API 部分
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.35; // 将语速设置为原来的1.35倍
    // 语音结束事件监听
    utterance.onend = function () {
        // 创建 Web Audio API 上下文
        const audioContext = new AudioContext();

        // 创建 Oscillator 节点
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine'; // 正弦波
        oscillator.frequency.value = 450; // 450Hz

        // 创建 Gain 节点控制音量
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 1.5; // 音量 1.5

        // 连接节点：Oscillator -> Gain -> Destination
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // 延迟两秒后启动
        setTimeout(() => {
            oscillator.start();

            // 播放一*0.2 秒后停止
            setTimeout(() => {
                getUserInput();
                oscillator.stop();
            }, 200);
        }, 1000);
    };

    // 开始语音合成
    speechSynthesis.speak(utterance);
}
