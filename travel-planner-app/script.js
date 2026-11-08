const defaultDestinations = [
  {
    id: 1,
    city: "Кјото",
    country: "Јапонија",
    category: "Култура",
    budget: 850,
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
    image2:
      "https://www.earthtrekkers.com/wp-content/uploads/2016/07/Kyoto-Photos.jpg.optimal.jpg",
    image3:
      "https://www.earthtrekkers.com/wp-content/uploads/2016/07/Arashiyama-Bamboo-Forest.jpg.optimal.jpg",
    description:
      "Традиционални храмови, бамбусови шуми и мирни јапонски градини.",
  },
  {
    id: 2,
    city: "Санторини",
    country: "Грција",
    category: "Море",
    budget: 420,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1hjBpB8XdF5RnPTKbsNWnUtwDkH94utvvesEk8QhAxa6EVi3RqolGxWJz&s=10",
    image2:
      "https://res.cloudinary.com/manawa/image/private/f_auto,c_limit,w_3840,q_auto/mldnwiurimunt8wxvyow",
    image3:
      "https://media.cntraveller.com/photos/611bebd1aac234341a8943e6/1:1/w_2000,h_2000,c_limit/mesa-pigadia-w2064a.jpg",
    description:
      "Бели куќички, сини куполи и незаборавни зајдисонца над Егејското Море.",
  },
  {
    id: 3,
    city: "Доломити",
    country: "Италија",
    category: "Природа",
    budget: 560,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9TEVHcpJcdTguG9R7Ah5ihN5YvNP9g0Uscp54VJCezQ&s=10",
    image3:
      "https://www.dolomites.org/CustomerData/536/Files/Images/belluno/cortina-d-ampezzo/cortina-d-ampezzo.jpg",
    description:
      "Импресивни планински врвови, езера и патеки за љубителите на природата.",
  },
  {
    id: 4,
    city: "Прага",
    country: "Чешка",
    category: "Култура",
    budget: 290,
    image:
      "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=900&q=80",
    image2:
      "https://putno-osiguranje.rs/wp-content/uploads/2024/02/panorama-grad-prag.jpg",
    image3:
      "https://parliamentnews.co.uk/wp-content/uploads/2023/03/Prague_Charles_Bridge_Getty1338204944.jpeg",

    description:
      "Историски мостови, калдрмисани улици и прекрасна архитектура.",
  },
  {
    id: 5,
    city: "Барселона",
    country: "Шпанија",
    category: "Градски одмор",
    budget: 640,
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80",
    image2:
      "https://i0.wp.com/anchor.hope.edu/wp-content/uploads/2026/03/Nativity-facade-Sagrada-Familia-cathedral-Barcelona-Spain.webp?fit=1600%2C1067&ssl=1",
    image3:
      "https://images.ctfassets.net/i3kf1olze1gn/16hnxSO4nmzIXNzWWD9Eva/f619eb4e71f0d0f5f4ede44d85717828/Casa_Batllo_.jpg?q=55&w=640",
    description: "Уметноста на Гауди, жива атмосфера, плажи и одлична храна.",
  },
  {
    id: 6,
    city: "Амстердам",
    country: "Холандија",
    category: "Градски одмор",
    budget: 720,
    image:
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=900&q=80",
    image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYu93wSxKErnaXoYBdFqOpMv6jhwyHyJFWGefAlTNgpNIsEhUvT9oObz62&s=10",
    image3:
      "https://media.cntraveller.com/photos/6925c058c8997bceeb7ade5c/16:9/w_2560%2Cc_limit/Canal-Bicycles-Amsterdam-GettyImages-2186230864.jpg",
    description: "Канали, музеи, велосипедски патеки и шармантни квартови.",
  },
];
const guides = [
  [
    "01",
    "Посети ја главната знаменитост",
    "Започни со најпознатото место во градот и дознај ја неговата приказна.",
  ],
  [
    "02",
    "Истражи локална храна",
    "Пробај традиционален специјалитет на локален пазар или во мал ресторан.",
  ],
  [
    "03",
    "Прошетај низ стариот град",
    "Откриј мали улички, архитектура и скриени плоштади.",
  ],
  [
    "04",
    "Посети музеј или галерија",
    "Запознај ја историјата, уметноста и културата на дестинацијата.",
  ],
  [
    "05",
    "Погледни го зајдисонцето",
    "Најди видиковец или мирно место за убав крај на денот.",
  ],
];
const extraTips = [
  "Откриј локален пазар",
  "Посети парк или градина",
  "Направи еднодневна екскурзија",
  "Разговарај со локалните жители",
  "Фотографирај ја омилената улица",
];
let destinations = load("tp_destinations", defaultDestinations);
let comments = load("tp_comments", {});
let reactions = load("tp_reactions", {});
let surveys = load("tp_surveys", []);
let activeCity = destinations[0]?.city || "";
const $ = (s) => document.querySelector(s);
const money = (n) => new Intl.NumberFormat("de-DE").format(n);
function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2300);
}
function budgetBand(n) {
  return n < 300 ? "low" : n <= 700 ? "mid" : "high";
}
function renderDestinations() {
  const q = $("#searchInput").value.trim().toLocaleLowerCase("mk"),
    cat = $("#categoryFilter").value,
    budget = $("#budgetFilter").value;
  const list = destinations.filter(
    (d) =>
      (d.city + " " + d.country).toLocaleLowerCase("mk").includes(q) &&
      (cat === "all" || d.category === cat) &&
      (budget === "all" || budgetBand(d.budget) === budget),
  );
  $("#destinationGrid").innerHTML = list
    .map(
      (d) => `
      <article class="destination-card">
        <div class="card-image" data-open="${d.id}">
          <img
            src="${safeUrl(d.image)}"
            alt="${escapeHtml(d.city)}"
            loading="lazy"
          /><span class="category-tag">${escapeHtml(d.category)}</span>
        </div>
        <div class="card-body">
          <span class="card-location">${escapeHtml(d.country)}</span>
          <h3>${escapeHtml(d.city)}</h3>
          <p>
            ${escapeHtml(d.description || "Откриј ја оваа прекрасна дестинација.")}
          </p>
          <div class="card-bottom">
            <div class="budget">
              <strong>€${money(d.budget)}</strong><br /><span
                >проценет буџет / лице</span
              >
            </div>
            <div class="card-actions">
              <button
                class="icon-btn"
                title="Повеќе детали"
                data-open="${d.id}"
              >
                ↗</button
              >${
                d.custom
                  ? `<button
                class="icon-btn"
                title="Избриши"
                data-delete="${d.id}"
              >
                ×</button
              >`
                  : ""
              }
            </div>
          </div>
        </div>
      </article>`,
    )
    .join("");
  $("#emptyState").classList.toggle("hidden", list.length > 0);
}
function safeUrl(url) {
  try {
    const u = new URL(url);
    return ["https:", "http:"].includes(u.protocol) ? u.href : "";
  } catch {
    return "";
  }
}
function escapeHtml(s = "") {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function syncCityOptions() {
  const options = destinations
    .map(
      (d) =>
        `<option value="${escapeHtml(d.city)}">${escapeHtml(d.city)}</option>`,
    )
    .join("");
  $("#galleryCity").innerHTML = options;
  $("#surveyDestination").innerHTML = options;
  if (!destinations.some((d) => d.city === activeCity))
    activeCity = destinations[0]?.city || "";
  $("#galleryCity").value = activeCity;
}
function renderGallery() {
  const d = destinations.find((x) => x.city === activeCity);
  if (!d) {
    $("#galleryGrid").innerHTML =
      "<p>Додај дестинација за да прикажеш галерија.</p>";
    return;
  }
  const imgs = [d.image, d.image, d.image, d.image, d.image];
  const captions = [
    "Момент што се памети",
    "Убавина на секој чекор",
    "Откриј нешто ново",
    "Мали улички, големи приказни",
    "Поглед за паметење",
  ];
  $("#commentCityName").textContent = d.city;
  $("#galleryGrid").innerHTML = imgs
    .map((img, i) => {
      const key = d.city + "-" + i,
        react = reactions[key] || { like: 0, dislike: 0 };
      return `<div class="gallery-item"><img src="${safeUrl(img)}" alt="${escapeHtml(d.city)} – фотографија ${i + 1}" loading="lazy"><div class="gallery-caption">${captions[i]}<div class="like-row"><button data-react="${key}" data-kind="like">♥ ${react.like}</button><button data-react="${key}" data-kind="dislike">♡ ${react.dislike}</button></div></div></div>`;
    })
    .join("");
  const cityComments = comments[d.city] || [];
  $("#commentsList").innerHTML = cityComments.length
    ? cityComments
        .map(
          (c) =>
            `<div class="comment"><strong>${escapeHtml(c.name)}</strong>${escapeHtml(c.text)}</div>`,
        )
        .join("")
    : '<p class="muted">Сè уште нема коментари. Биди прв/а!</p>';
}
function renderGuides() {
  const all = [
    ...guides,
    ...extraTips.map((t, i) => [
      String(i + 6).padStart(2, "0"),
      t,
      "Додај го ова искуство во планот за следното патување.",
    ]),
  ];
  $("#guideGrid").innerHTML = all
    .map(
      (g) =>
        `<article class="guide-card"><span class="guide-number">${g[0]}</span><h3>${g[1]}</h3><p>${g[2]}</p></article>`,
    )
    .join("");
}
function showCity(id) {
  const d = destinations.find((x) => x.id === Number(id));
  if (!d) return;
  $("#cityDetails").innerHTML =
    `<span class="card-location">${escapeHtml(d.country)} · ${escapeHtml(d.category)}</span>
    <h2>${d.city}</h2>
    <div class="container" style="width: 80%">
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>

        <div
          class="carousel-inner"
          style="max-height: 400px; overflow: hidden"
        >
          <div class="item active">
            <img
              src="${safeUrl(d.image)}"
              alt="Los Angeles"
              style="width: 100%"
            />
          </div>

          <div class="item">
            <img
            src="${safeUrl(d.image2)}"
            alt="Chicago" 
            style="width: 100%" />
          </div>

          <div class="item">
            <img src="${safeUrl(d.image3)}" alt="New york" style="width: 100%" />
          </div>
        </div>

        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="right carousel-control"
          href="#myCarousel"
          data-slide="next"
        >
          <span class="glyphicon glyphicon-chevron-right"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div> 
    <p>${escapeHtml(d.description || "Откриј ја оваа дестинација.")}</p>
    <strong>Проценет буџет: €${money(d.budget)} по лице</strong>
    <p>
      Буџетот е информативна проценка и може да се разликува според сезоната и
      стилот на патување.
    </p>
    `;
  $("#cityDialog").showModal();
}
function refresh() {
  renderDestinations();
  syncCityOptions();
  renderGallery();
  $("#surveyCount").textContent = surveys.length;
}
$("#searchInput").addEventListener("input", renderDestinations);
$("#categoryFilter").addEventListener("change", renderDestinations);
$("#budgetFilter").addEventListener("change", renderDestinations);
$("#destinationGrid").addEventListener("click", (e) => {
  const open = e.target.closest("[data-open]"),
    del = e.target.closest("[data-delete]");
  if (open) showCity(open.dataset.open);
  if (del) {
    destinations = destinations.filter(
      (d) => d.id !== Number(del.dataset.delete),
    );
    save("tp_destinations", destinations);
    refresh();
    toast("Дестинацијата е избришана.");
  }
});
$("#galleryCity").addEventListener("change", (e) => {
  activeCity = e.target.value;
  renderGallery();
});
$("#galleryGrid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-react]");
  if (!b) return;
  const key = b.dataset.react,
    kind = b.dataset.kind;
  reactions[key] ??= { like: 0, dislike: 0 };
  reactions[key][kind]++;
  save("tp_reactions", reactions);
  renderGallery();
});
$("#commentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = $("#commentInput").value.trim();
  if (!text) return;
  comments[activeCity] ??= [];
  comments[activeCity].push({ name: "Посетител", text });
  save("tp_comments", comments);
  $("#commentInput").value = "";
  renderGallery();
  toast("Коментарот е објавен.");
});
$("#addDestinationBtn").addEventListener("click", () =>
  $("#destinationDialog").showModal(),
);
$("#closeDestination").addEventListener("click", () =>
  $("#destinationDialog").close(),
);
$("#destinationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.currentTarget);
  const city = f.get("city").trim();
  if (
    destinations.some(
      (d) => d.city.toLocaleLowerCase() === city.toLocaleLowerCase(),
    )
  ) {
    toast("Овој град веќе постои.");
    return;
  }
  const image =
    safeUrl(f.get("image")) ||
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=80";
  destinations.push({
    id: Date.now(),
    city,
    country: f.get("country").trim(),
    category: f.get("category"),
    budget: Number(f.get("budget")),
    image,
    description: f.get("description").trim(),
    custom: true,
  });
  save("tp_destinations", destinations);
  activeCity = city;
  e.currentTarget.reset();
  $("#destinationDialog").close();
  refresh();
  toast("Новата дестинација е додадена.");
});
$("#surveyForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget));
  surveys.push({ ...data, date: new Date().toISOString() });
  save("tp_surveys", surveys);
  e.currentTarget.reset();
  $("#surveyMessage").textContent =
    "Ти благодариме! Анкетата е успешно зачувана.";
  $("#surveyCount").textContent = surveys.length;
});
$("#loginBtn").addEventListener("click", () => $("#loginDialog").showModal());
$("#closeLogin").addEventListener("click", () => $("#loginDialog").close());
$("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = new FormData(e.currentTarget).get("email");
  $("#loginMessage").textContent = `Демо најава успешна за ${email}.`;
  $("#loginBtn").textContent = "Мој профил";
  setTimeout(() => $("#loginDialog").close(), 900);
});
$("#closeCity").addEventListener("click", () => $("#cityDialog").close());
$("#mainNav").addEventListener("click", (e) => {
  if (e.target.tagName === "A") $("#mainNav").classList.remove("open");
});
renderGuides();
refresh();
