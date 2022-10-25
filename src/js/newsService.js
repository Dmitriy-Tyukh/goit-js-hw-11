import { onError } from '../index';
// export { fetchPhotos };

export default class NewsApiServise {
    constructor() { 
        this.inputValue = '';
        this.page = 1;
    };
    
    fetchPhotos() {
        console.log(this);

        const BASE_URL = 'https://pixabay.com/api/?key=30833606-8c70618e48dea164cb3e2224f';
        const OPTIONS_PHOTO = `image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${this.page}`;

        return fetch(`${BASE_URL}&q=${this.inputValue}&${OPTIONS_PHOTO}`)
        .then(r => {
            if (!r.ok || r.status === 404) {
              throw Error(onError);
            }
            return r.json();
        })
            .then(data => {
                this.page += 1;
                return data.hits
            });
    }
    resetPage() {
        this.page = 1;
    }

    get value() {
        return this.inputValue;
    }
    set value (newInputValue) {
        this.inputValue = newInputValue;
    }
}

    
    
    
    
    
    

// const BASE_URL =
//   'https://pixabay.com/api/?key=30833606-8c70618e48dea164cb3e2224f';
// const OPTIONS_PHOTO =
//   'image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=1';

// function fetchPhotos(inputValue) {
//   return fetch(`${BASE_URL}&q=${inputValue}&${OPTIONS_PHOTO}`).then(r => {
//     if (!r.ok || r.status === 404) {
//       throw Error(onError);
//     }
//     return r.json();
//   });
// }
