const items = [
  { name: "Dekadrachm Coin", year: -400, img: "images/Dekadrachm.png" },
  { name: "Dish with Crowned Woman", year: 1200, img: "images/Dish.png" },
  {
    name: "Bernardo Daddi Crucifixion",
    year: 1350,
    img: "images/Crucifixion.png",
  },
  { name: "O Dea Mitre", year: 1418, img: "images/O Dea Mitre.png" },
  { name: "Sheela-na-gig", year: 1450, img: "images/Sheela-na-gig.png" },
  { name: "Drinking Horn", year: 1480, img: "images/Drinking Horn.png" },
  {
    name: "Mary Queen of Scots Cross",
    year: 1590,
    img: "images/Mary Queen of Scots Cross.png",
  },
  { name: "Galway Chalice", year: 1630, img: "images/Galway Chalice.png" },
  { name: "Apollo – Genius of the Arts", year: 1650, img: "images/Apollo.png" },
  { name: "Meissen Pietà", year: 1732, img: "images/Meissen Pieta.png" },
  {
    name: "The Artist and His Wife",
    year: 1803,
    img: "images/The Artist and His Wife.png",
  },
  { name: "Picasso Plat Del Dia", year: 1900, img: "images/Picasso.png" },
  { name: "Suzanne Boterell", year: 1920, img: "images/Suzanne Boterell.png" },
  {
    name: "Night's Candles are Burnt Out",
    year: 1930,
    img: "images/Night's Candles are Burnt Out.png",
  },
  {
    name: "Henry Moore Drawings",
    year: 1932,
    img: "images/Henry Moore Drawings.png",
  },
  {
    name: "An Atlantic Drive",
    year: 1944,
    img: "images/An Atlantic Drive.png",
  },
  {
    name: "A Day at the Hunt by Ingrid Murphy",
    year: 2016,
    img: "images/A Day at the Hunt by Ingrid Murphy.png",
  },
];

let lives = 5;
let currentIndex = 0;
const cardPool = document.getElementById("cardPool");
const timeline = document.getElementById("timeline");

function updateLivesDisplay() {
  document.getElementById("lives").innerText = "❤️".repeat(lives);
}

function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";
  card.draggable = true;
  card.dataset.year = item.year;
  card.innerHTML = `
  <img src="${item.img}" alt="${item.name}" />
  <div>${item.name}</div>
`;
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  });
  return card;
}

function showNextCard() {
  cardPool.innerHTML = "";
  if (currentIndex < items.length) {
    const card = createCard(items[currentIndex]);
    cardPool.appendChild(card);
  } else {
    cardPool.innerHTML = "<p>🎉 All cards placed!</p>";
  }
}

function createSlot(year) {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.dataset.year = year;

  const label = document.createElement("div");
  label.className = "year-label";
  label.innerText = year > 0 ? year : `${Math.abs(year)} BC`;
  slot.appendChild(label);

  slot.addEventListener("dragover", (e) => e.preventDefault());
  slot.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (parseInt(slot.dataset.year) === data.year) {
      slot.classList.add("correct");
      slot.innerHTML = `<div class="year-label">${slot.dataset.year}</div><strong>${data.name}</strong><div class="info-card">Placed correctly! Year: ${data.year}</div>`;
      currentIndex++;
      showNextCard();
    } else {
      slot.classList.add("wrong");
      setTimeout(() => slot.classList.remove("wrong"), 800);
      lives--;
      updateLivesDisplay();
     if (lives === 0) {
  cardPool.innerHTML = "<p> Game Over</p>";

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "🔁 Restart Game";
  restartBtn.className = "restart-button";
  restartBtn.onclick = () => window.location.reload();

  cardPool.appendChild(restartBtn);
}

    }
  });

  return slot;
}

function init() {
  items.sort(() => Math.random() - 0.5);
  showNextCard();

  const years = [...items.map((i) => i.year)].sort((a, b) => a - b);
  years.forEach((year) => {
    timeline.appendChild(createSlot(year));
  });

  updateLivesDisplay();
}
function startGame() {
  document.getElementById("startScreen").style.display = "none";
  init();
}

// init();
