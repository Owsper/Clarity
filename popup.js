const input = document.getElementById("wordInput");
const button = document.getElementById("saveWord");
const list = document.getElementById("wordList");

// Load and render words
function loadWords() {
  chrome.storage.local.get(["blockedWords"], (result) => {
    const words = result.blockedWords || [];

    list.innerHTML = "";

    if (words.length === 0) {
      const empty = document.createElement("li");
      empty.textContent = "No words added yet";
      empty.style.opacity = "0.6";
      empty.style.textAlign = "center";
      list.appendChild(empty);
      return;
    }

    words.forEach((word, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span>${word}</span>
        <span class="delete-btn">✖</span>
      `;

      // Delete word
      li.querySelector(".delete-btn").addEventListener("click", () => {
        words.splice(index, 1);

        chrome.storage.local.set({ blockedWords: words }, () => {
          loadWords();
        });
      });

      list.appendChild(li);
    });
  });
}

// Add new word
function addWord() {
  const word = input.value.trim().toLowerCase();
  if (!word) return;

  chrome.storage.local.get(["blockedWords"], (result) => {
    const words = result.blockedWords || [];

    if (words.includes(word)) {
      input.value = "";
      return;
    }

    words.push(word);

    chrome.storage.local.set({ blockedWords: words }, () => {
      input.value = "";
      loadWords();
    });
  });
}

// Events
button.addEventListener("click", addWord);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addWord();
});

// Initial load
loadWords();