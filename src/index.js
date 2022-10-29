import './sass/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { simpleLightbox } from './js/options';
import { firstLoad, onWarningFinisf, onWarning, onError } from './js/notiflix-fn';
import { createImg } from './js/createImg';
import NewsApiServise from './js/newsService';
import LoadMoreBtn from './js/loadMoreBtn';
export { fetchCards };

const newsApiServise = new NewsApiServise();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

const getEl = selector => document.querySelector(selector);
getEl('.search-form').addEventListener('submit', onSubmitForm);
loadMoreBtn.refs.button.addEventListener('click', fetchCards);

function onSubmitForm(e) {
  e.preventDefault();
  clearCardsContainer();
  newsApiServise.value = e.target.searchQuery.value.trim();
  console.log(newsApiServise.totalHits);
  fetchCards();
}

async function fetchCards() {
    if (!newsApiServise.value) {
        onWarning();
    return;
    }
    loadMoreBtn.show();
    loadMoreBtn.disable();
        try {
            const photos = await newsApiServise.fetchPhotos();
        }
        catch (error) {
            if (error.name === 'SyntaxError') {
                loadMoreBtn.hide();
                onWarningFinisf();
            } else {
                onError();
            }
        }
    createImg(photos);
    simpleLightbox.refresh();
    smoothScroll();
    loadMoreBtn.enable();
    if (newsApiServise.page === 1) {
        firstLoad(photos.totalHits);
    return;
    }
}

const clearCardsContainer = () => {
  getEl('.gallery').innerHTML = '';
};
