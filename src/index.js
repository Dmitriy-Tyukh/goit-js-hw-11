import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchPhotos} from './js/fetchPhotos'


const getEl = selector => document.querySelector(selector);
getEl('button').classList.add('btnSubmit')
getEl('.search-form').addEventListener('submit', onSubmitForm)

function onSubmitForm(e) {
    e.preventDefault()
    const inputValue = e.target.searchQuery.value;
    fetchPhotos(inputValue).then(createImg).catch(onError);
}

function createImg(photos) { 
    getEl('.gallery').innerHTML = templateFunction(photos.hits);
}





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