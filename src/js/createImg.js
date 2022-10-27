export { createImg };

const getEl = selector => document.querySelector(selector);

function createImg(photos) {
  const markupCards = photos.hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) =>
      `<ul class="articles js-articles-container">
        <li>
            <div class="photo-card">
                <img src='${webformatURL}' alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes: ${likes}</b>
                        </p>
                        <p class="info-item">
                            <b>Views: ${views}</b>
                        </p>
                        <p class="info-item">
                            <b>Comments: ${comments}</b>
                        </p>
                        <p class="info-item">
                            <b>Downloads: ${downloads}</b>
                        </p>
                    </div>
                </div>
            </li>
        </ul>`
  );
  getEl('.gallery').innerHTML += markupCards;
}
