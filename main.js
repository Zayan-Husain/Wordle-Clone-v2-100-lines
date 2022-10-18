import data from './words_dictionary.json' assert {type: "json"};
var currentSpace = [0, 0] //[row, column]
var word = "warts";
var wordGuessed = false;
function getFromClass(classes) {
    return document.getElementsByClassName(classes)[0]
}
function colorSpot(spot, color) {
    let elem = getFromClass(getTableSpot(spot))
    elem.classList.remove('gray');
    elem.classList.remove('green');
    elem.classList.remove('yellow');
    elem.classList.add(color);
}
function getTableSpot(spotArr) {
    let str = "";
    let c1 = "r" + (spotArr[0] + 1)
    let c2 = "c" + (spotArr[1] + 1)
    str = `${c1} ${c2}`
    return str;
}
function getCurrTableSpot() {
    return getTableSpot(currentSpace);
}
document.addEventListener("keyup", e => {
    if (wordGuessed) return;
    let k = e.key;
    let elem = document.getElementsByClassName(getCurrTableSpot())[0]
    if (k.length <= 1 && elem != null && isNaN(parseInt(k))) {
        if (currentSpace[1] < 5) elem.innerHTML = `<span>${k.toUpperCase()}</span>`
        if (currentSpace[1] < 5) currentSpace = [currentSpace[0], (currentSpace[1] + 1)]
    }
    if (k == "Backspace") {
        if (currentSpace[1] == 0) return;
        currentSpace = [(currentSpace[0]), (currentSpace[1] - 1)]
        elem = document.getElementsByClassName(getCurrTableSpot())[0]
        elem.innerHTML = ""
    }
    if (k == "Enter" && currentSpace[1] == 5) {
        let guess = [
            document.getElementsByClassName(getTableSpot([currentSpace[0], 0]))[0].innerHTML.substring(6, 7).toLowerCase(),
            document.getElementsByClassName(getTableSpot([currentSpace[0], 1]))[0].innerHTML.substring(6, 7).toLowerCase(),
            document.getElementsByClassName(getTableSpot([currentSpace[0], 2]))[0].innerHTML.substring(6, 7).toLowerCase(),
            document.getElementsByClassName(getTableSpot([currentSpace[0], 3]))[0].innerHTML.substring(6, 7).toLowerCase(),
            document.getElementsByClassName(getTableSpot([currentSpace[0], 4]))[0].innerHTML.substring(6, 7).toLowerCase()
        ]
        if (!data[guess.toString().replaceAll(',', '')]) {
            alert("Your guess is not a word!"); return;
        }
        for (var i in guess) {
            if (isNaN(parseInt(i))) break;
            let j = guess[i];
            if (word.includes(j)) {
                document.getElementsByClassName(getTableSpot([currentSpace[0], parseInt(i)]))[0].classList.add("yellow")
                document.getElementsByClassName(getTableSpot([currentSpace[0], parseInt(i)]))[0].classList.remove("green")
                document.getElementsByClassName(getTableSpot([currentSpace[0], parseInt(i)]))[0].classList.remove("gray")
                if (j == word[i]) {
                    document.getElementsByClassName(getTableSpot([currentSpace[0], parseInt(i)]))[0].classList.add("green")
                    document.getElementsByClassName(getTableSpot([currentSpace[0], parseInt(i)]))[0].classList.remove("yellow")
                    document.getElementsByClassName(getTableSpot([currentSpace[0], parseInt(i)]))[0].classList.remove("gray")
                }
            } else {
                document.getElementsByClassName(getTableSpot([currentSpace[0], parseInt(i)]))[0].classList.add("gray")
                document.getElementsByClassName(getTableSpot([currentSpace[0], parseInt(i)]))[0].classList.remove("yellow")
                document.getElementsByClassName(getTableSpot([currentSpace[0], parseInt(i)]))[0].classList.remove("green")
            }
        }
        var lettersDone = [];
        for (var i in guess) {
            let j = guess[i];
            if (lettersDone.indexOf(j) != -1) break; //if lettersDone array already has j, move on to the next letter
            lettersDone.push(j)
            let guessStr = guess.toString()
            let ge = guessStr.split(j).length - 1
            let ae = word.split(j).length - 1
            if (ge == 1) break;
            if (ae == 0) break;
            if (ge <= ae) break;
            if (ge > ae) {
                let de = ge - ae
                let eleft = de;
                for (var i = guess.length - 1; i >= 0; i--) {
                    if (eleft == 0) break;
                    if (guess[i] == j) {
                        if (getFromClass(getTableSpot([currentSpace[0], i])).classList[2] == "yellow") {
                            colorSpot([currentSpace[0], i], "gray");
                            eleft--;
                        }
                    }
                }
            }
        }
        if (guess.toString().replaceAll(',', '') == word) {
            currentSpace = [0, 0];
            wordGuessed = true;
            return;
        }
        currentSpace = [currentSpace[0] + 1, 0]
    }
})