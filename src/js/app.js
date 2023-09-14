//***  TOGGLE */
const toogleMenuIcon = document.querySelector(".toogle-menu__icon ");
const navBackground = document.querySelector(".nav-background");

toogleMenuIcon.addEventListener("click", (e) => {
  navBackground.classList.toggle("show");
});

//***  FORM */
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const textLink = e.target.querySelector("input").value.trim();

  if (textLink === "") {
    form.querySelector("input").style.border = "2px solid var(--Red)";
    form.querySelector(".message-error").classList.add("show");
  } else {
    form.querySelector("input").style.border = "2px solid transparent";
    form.querySelector(".message-error").classList.remove("show");

    createShortenTemplate(textLink);
    form.reset();
  }
});

//***  SHORTENED - TEMPLATE ELEMENT */
const cardShortenContainer = document.querySelector(".card-shorten-container");
const fragment = document.createDocumentFragment();

const maxShorten = 3;
let id = 0;
function createShortenTemplate(shortenLink) {
  const apiUrl = `https://api.shrtco.de/v2/shorten?url=${shortenLink}`;

  //*** FETCHING */
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      id++;

      if (id <= maxShorten) {
        console.log(data.result.short_link);
        const shortenedLink = data.result.short_link;

        const cardShorten = document.createElement("div");
        cardShorten.setAttribute("class", "card-shorten");

        const cardShortenLink = document.createElement("a");
        cardShortenLink.setAttribute("class", "card-shorten__link");
        cardShortenLink.setAttribute("href", shortenLink);
        cardShortenLink.setAttribute("target", "_blank");
        cardShortenLink.textContent = shortenLink;

        const cardShortenedLink = document.createElement("a");
        cardShortenedLink.setAttribute(
          "class",
          "card-shortened__link disabled"
        );
        cardShortenedLink.setAttribute("target", "_blank");
        cardShortenedLink.setAttribute("href", shortenedLink);
        cardShortenedLink.setAttribute("id", "id" + id);
        cardShortenedLink.textContent = shortenedLink;

        const cardShortenBtn = document.createElement("a");
        cardShortenBtn.setAttribute("class", "card-shorne__btn");
        cardShortenBtn.setAttribute("data-id", id);
        cardShortenBtn.textContent = "Copy";

        cardShorten.appendChild(cardShortenLink);
        cardShorten.appendChild(cardShortenedLink);
        cardShorten.appendChild(cardShortenBtn);

        fragment.appendChild(cardShorten);
        cardShortenContainer.prepend(fragment);
      } else {
        const lastChildElement = cardShortenContainer.lastElementChild;

        if (lastChildElement.nodeType === Node.ELEMENT_NODE) {
          cardShortenContainer.removeChild(lastChildElement);
        }

        const shortenedLink = data.result.short_link;

        const cardShorten = document.createElement("div");
        cardShorten.setAttribute("class", "card-shorten");

        const cardShortenLink = document.createElement("a");
        cardShortenLink.setAttribute("class", "card-shorten__link disabled");
        cardShortenLink.setAttribute("href", shortenLink);
        cardShortenLink.setAttribute("target", "_blank");
        cardShortenLink.textContent = shortenLink;

        const cardShortenedLink = document.createElement("a");
        cardShortenedLink.setAttribute("class", "card-shortened__link");
        cardShortenedLink.setAttribute("target", "_blank");
        cardShortenedLink.setAttribute("href", shortenedLink);
        cardShortenedLink.setAttribute("id", "id" + id);
        cardShortenedLink.textContent = shortenedLink;

        const cardShortenBtn = document.createElement("a");
        cardShortenBtn.setAttribute("class", "card-shorne__btn");
        cardShortenBtn.setAttribute("data-id", id);
        cardShortenBtn.textContent = "Copy";

        cardShorten.appendChild(cardShortenLink);
        cardShorten.appendChild(cardShortenedLink);
        cardShorten.appendChild(cardShortenBtn);

        fragment.appendChild(cardShorten);
        cardShortenContainer.prepend(fragment);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//*** COPY **/
cardShortenContainer.addEventListener("click", copyLink);

function copyLink(event) {
  event.stopPropagation();

  if (event.target.getAttribute("data-id")) {
    const shortenedLinkElement = document.querySelector(
      `#id${event.target.dataset.id}`
    );
    event.target.classList.add("btn-copied");
    event.target.textContent = "Copied!";
    const shortenedLink = shortenedLinkElement.textContent;

    navigator.clipboard
      .writeText(shortenedLink)
      .then(() => {
        console.log("copied");
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
