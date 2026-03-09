const blockedWords = {
  nsfw: ["nsfw", "18+", "sexy", "onlyfans"],
  thirst: ["hot girl", "link in bio", "thirst trap"],
  rage: ["you won't believe", "shocking", "outrage", "breaking"],
  ads: ["sponsored", "ad", "promoted"]
};

function filterPosts() {
  const elements = document.querySelectorAll("div, span, p, article");

  elements.forEach(el => {
    const text = el.innerText?.toLowerCase();
    if (!text) return;

    Object.values(blockedWords).flat().forEach(word => {
      if (text.includes(word)) {
        el.classList.add("blur");
      }
    });
  });
}

// Run filter on page load
window.addEventListener("load", filterPosts);