let novelLists = [];
let filteredLists = [];
async function fetchData() {
  let res = await fetch(
    "https://novels-5cd59-default-rtdb.asia-southeast1.firebasedatabase.app/.json"
  );
  let data = await res.json();

  novelLists = Object.entries(data).map(([id, novel]) => ({ id, ...novel }));
  applyFiltersAndRender();
}

function applyFiltersAndRender() {
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let query = document.getElementById("search-query").value.toLowerCase();
  let sortValue = document.getElementById("sort-select").value;

  filteredLists = novelLists.filter((novel) => {
    let validYear = true;
    if (startDate && endDate) {
      validYear =
        novel.release_year >= startDate && novel.release_year <= endDate;
    }

    let validSearch = true;
    if (query) {
      validSearch =
        novel.title?.toLowerCase().includes(query) ||
        novel.author?.toLowerCase().includes(query);
    }
    return validYear && validSearch;
  });

  if (sortValue === "asc") {
    filteredLists.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortValue === "desc") {
    filteredLists.sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  renderNovels(filteredLists);
}

function renderNovels(lists) {
  let novelContainer = document.getElementById("novel-container");
  novelContainer.innerHTML = "";
  lists.forEach((novel) => {
    let novelCard = document.createElement("div");
    novelCard.innerHTML = `
            <h3>${novel.title}</h3>
            <p>Author: ${novel.author || "Unknown"}</p>
            <p>Price: ₹${novel.price?.toLocaleString()}</p>
            <p>Year: ${novel.release_year}</p>
            <p>Genre: ${novel.genre || ""}</p>
        `;
    novelContainer.appendChild(novelCard);
  });
}

document
  .getElementById("search-query")
  .addEventListener("input", applyFiltersAndRender);
document
  .getElementById("sort-select")
  .addEventListener("change", applyFiltersAndRender);
document
  .getElementById("start-date")
  .addEventListener("input", applyFiltersAndRender);
document
  .getElementById("end-date")
  .addEventListener("input", applyFiltersAndRender);
document
  .getElementById("search")
  .addEventListener("click", applyFiltersAndRender);

fetchData();
