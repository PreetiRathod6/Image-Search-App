const accessKey = 'wogiZUmAZ_1_oIHfMP0HL2qno224lB14Mqu-zyuqlto';


const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

// API - ASYNC FUNCTION

let keyword = '';
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if(page === 1){
    searchResult.innerHTML = "";
  }
  const results = data.results;

  results.map((result) => {
    const image = document.createElement('img');
    image.src = result.urls.small;

    const imageLink = document.createElement('a'); // Corrected line
    imageLink.href = result.links.html;
    imageLink.target = '_blank'; // open the new link here

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });

  showMoreBtn.style.display = 'block';
}

//input field when user search something

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

//show more button
showMoreBtn.addEventListener('click', () => {
  page++;
  searchImages();
});