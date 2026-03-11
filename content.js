chrome.storage.local.get(["blockedWords"], (result) => {

const words = result.blockedWords || [];

const elements = document.querySelectorAll("div, span, p, a");

elements.forEach(el => {

const text = el.innerText?.toLowerCase();

if (!text) return;

words.forEach(word => {

if (text.includes(word)) {

el.style.filter = "blur(8px)";

}

});

});

});