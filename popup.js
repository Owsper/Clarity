const input = document.getElementById("wordInput");
const button = document.getElementById("saveWord");
const list = document.getElementById("wordList");

function loadWords() {

chrome.storage.local.get(["blockedWords"], (result) => {

const words = result.blockedWords || [];

list.innerHTML = "";

words.forEach(word => {

const li = document.createElement("li");
li.textContent = word;
list.appendChild(li);

});

});

}

button.addEventListener("click", () => {

const word = input.value.toLowerCase();

chrome.storage.local.get(["blockedWords"], (result) => {

const words = result.blockedWords || [];

words.push(word);

chrome.storage.local.set({ blockedWords: words });

input.value = "";

loadWords();

});

});

loadWords();