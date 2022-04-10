const cardsSection = document.querySelector(".cards");
const loadCardsDiv = document.querySelector(".load-cards");
const loadCardsButton = document.querySelector(".load-cards-button");
let html = "";
let fetchLink;
let dataCounter = 0;
let likes;

async function fetchApi(url) {
  const dataFetch = await fetch(url);
  const data = await dataFetch.json();
  return data;
}

function generateFourCards(data) {
  dataCounter += 4;

  for (let i = 0; i < dataCounter; i++) {
    htmlTemplate(data[i]);
  }
}

async function fetchData() {
  fetchLink = "./assets/data/data.json";
  const data = await fetchApi(fetchLink);
  generateFourCards(data);
}

function htmlTemplate(data) {
  html += `
    <div class="card-overlay">
      <div class="card-modal"></div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-header-profile">
          <img src=${data.profile_image} alt="Person image" class="card-profile-image" />
          <div class="card-profile-person">
            <h2 class="card-person">${data.name}</h2>
            <p class="card-date">${data.date}</p>
          </div>
        </div>
        <img src="./assets/icons/instagram-logo.svg" alt="Instagram logo" />
      </div>

      <div class="card-main">
        <img src=${data.image} alt="Image" class="card-main-image" />
        <p class="card-main-text">${data.caption}</p>
      </div>

      <div class="card-footer">
        <button class="like-btn">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7617 3.26543C14.3999 2.90347 13.9703 2.61634 13.4976 2.42045C13.0248 2.22455 12.518 2.12372 12.0063 2.12372C11.4945 2.12372 10.9878 2.22455 10.515 2.42045C10.0422 2.61634 9.61263 2.90347 9.25085 3.26543L8.50001 4.01626L7.74918 3.26543C7.0184 2.53465 6.02725 2.1241 4.99376 2.1241C3.96028 2.1241 2.96913 2.53465 2.23835 3.26543C1.50756 3.99621 1.09702 4.98736 1.09702 6.02084C1.09702 7.05433 1.50756 8.04548 2.23835 8.77626L2.98918 9.52709L8.50001 15.0379L14.0108 9.52709L14.7617 8.77626C15.1236 8.41448 15.4108 7.98492 15.6067 7.51214C15.8026 7.03935 15.9034 6.53261 15.9034 6.02084C15.9034 5.50908 15.8026 5.00233 15.6067 4.52955C15.4108 4.05677 15.1236 3.62721 14.7617 3.26543V3.26543Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <p class="card-likes">${data.likes}</p>
      </div>
    </div>
  </div>
  `;

  loadCardsDiv.classList.add("active");
  cardsSection.innerHTML = html;
  loadCardsDiv.classList.add("active");

  const likeButton = document.querySelectorAll(".like-btn");
  likeButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!e.target.parentElement.classList.contains("active")) {
        incrementLikes(e);
      } else {
        decrementLikes(e);
      }
    });
  });

  const incrementLikes = (e) => {
    e.target.parentElement.classList.add("active");
    likes = parseInt(e.path[2].children[1].textContent) + 1;
    e.path[2].children[1].textContent = likes;
  };

  const decrementLikes = (e) => {
    e.target.parentElement.classList.remove("active");
    likes = parseInt(e.path[2].children[1].textContent) - 1;
    e.path[2].children[1].textContent = likes;
  };
}

async function loadMore() {
  fetchLink = "./assets/data/data.json";
  const data = await fetchApi(fetchLink);
  if (dataCounter === data.length) return;

  let cardOne = "";
  let cardTwo = "";

  for (let i = dataCounter; i < dataCounter + 4; i++) {
    cardOne = data[i];
    cardTwo = data[i];

    if (cardOne === cardTwo) {
      if (cardOne !== cardTwo) {
        return;
      } else {
        htmlTemplate(data[i]);
      }
    }

    if (data.length - i === 1) {
      loadCardsButton.style.display = "none";
    }
  }
  dataCounter += 4;
}

fetchData();
loadCardsButton.addEventListener("click", loadMore);
