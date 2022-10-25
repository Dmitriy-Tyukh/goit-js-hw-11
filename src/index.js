import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { fetchPhotos } from './js/newsService'
import { createImg } from './js/createImg';
import NewsApiServise from './js/newsService';

// import { onLoadMoreCreate } from './js/onLoadMore';

const getEl = selector => document.querySelector(selector);
getEl('button').classList.add('btnSubmit')
getEl('.search-form').addEventListener('submit', onSubmitForm);
getEl('.load-more').addEventListener('click', onLoadMore);

const newsApiServise = new NewsApiServise();

function onSubmitForm(e) {
    e.preventDefault()
    
    newsApiServise.value = e.target.searchQuery.value;
    newsApiServise.resetPage();
    newsApiServise.fetchPhotos().then(createImg).catch(onError);

    // fetchPhotos(inputValue).then(createImg).catch(onError);
}

function onLoadMore() {
    newsApiServise.fetchPhotos().then(createImg).catch(onError);
//   onLoadMoreCreate(inputValue).then(createImg).catch(onError);
}



// function createImg(photos) { 
//     console.log(photos);
//     const cards = photos.hits.map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => 
//         `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes: ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views: ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads: ${downloads}</b>
//     </p>
//   </div>
// </div>`
//     );
//     getEl('.gallery').innerHTML = cards;
// }





// const onWarning = () => {
//   Notify.info('Too many matches found. Please enter a more specific name', {
//     timeout: 2000,
//   });
// };

export const onError = () => {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',{
      timeout: 2000,
    }
  );
};