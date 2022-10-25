// import { onError } from '../index';
// export { onLoadMoreCreate };

// const BASE_URL =
//   'https://pixabay.com/api/?key=30833606-8c70618e48dea164cb3e2224f';
// const OPTIONS_PHOTO =
//   'image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=2';

// function onLoadMoreCreate(inputValue) {
//   return fetch(`${BASE_URL}&q=${inputValue}&${OPTIONS_PHOTO}`).then(r => {
//     if (!r.ok || r.status === 404) {
//       throw Error(onError);
//     }
//     return r.json();
//   });
// }
