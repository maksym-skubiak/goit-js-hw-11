import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './pixabay-api';
import {
  displayImages,
  showLoadingIndicator,
  hideLoadingIndicator,
} from './render-functions';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term.',
    });
    return;
  }

  showLoadingIndicator();
  try {
    const images = await fetchImages(query);
    displayImages(images);
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoadingIndicator();
  }
});
