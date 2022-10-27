import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createImg } from './js/createImg';
import NewsApiServise from './js/newsService';
import LoadMoreBtn from './js/loadMoreBtn';

const newsApiServise = new NewsApiServise();
const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

const getEl = selector => document.querySelector(selector);
getEl('[type="submit"]').classList.add('btnSubmit');
getEl('.search-form').addEventListener('submit', onSubmitForm);
loadMoreBtn.refs.button.addEventListener('click', fetchCards);

function onSubmitForm(e) {
    e.preventDefault()
    clearCardsContainer();
    newsApiServise.value = e.target.searchQuery.value.trim();
    fetchCards();
}

async function fetchCards() {
    if (!newsApiServise.value) {
        onWarning();
        return;
    }
    try {
        loadMoreBtn.show();
        loadMoreBtn.disable();
        
        const photos = await newsApiServise.fetchPhotos()
        // if (photos.totalHits - photos.hits.length * newsApiServise.page < 0) {
        //     loadMoreBtn.hide();
        // }
        // console.log(newsApiServise.page);
        // console.log(photos.hits.length);
        // console.log(photos.totalHits);

        createImg(photos);
        loadMoreBtn.enable();

    }
    catch (error) {
        switch (error.type) {
            case 400:
                onWarningFinisf();
                loadMoreBtn.hide();
                break;

            case 404:
                throw Error(onError);
                break;

            default:
                onError()
        }
    }
}

//        }
       
        // console.dir(e);
        // console.log(e.name);
        // console.log(e.stack);
        // console.log(e.message);
//     }
// }




const clearCardsContainer = () => {
    getEl('.gallery').innerHTML = '';
};

const onWarningFinisf = () => {
    Notify.info('We\'re sorry, but you\'ve reached the end of search results.')};

const onWarning = () => {
  Notify.info('Too many matches found. Please enter a more specific name')};

export const onError = () => {

  Notify.failure('Sorry, there are no images matching your search query. Please try again.')};