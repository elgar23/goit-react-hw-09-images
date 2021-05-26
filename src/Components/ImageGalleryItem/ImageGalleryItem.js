import { useEffect, useState } from 'react';

import s from './ImageGalleryItem.module.css';
import Loaders from '../Loader/Loader';
import Api from '../Api/Api';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  onFetch,
  visible,
  numberPage,
  resPage,
  largeImageURL,
}) {
  const [gallery, setGallery] = useState([]);
  const [fetch, setFetch] = useState(null);
  const [status, setStatus] = useState('idle');
  const [number, setNumber] = useState(null);

  useEffect(() => {
    if (onFetch === '') {
      setStatus('idle');
      visible(true);
    }
  }, [onFetch, visible]);

  useEffect(() => {
    setFetch(true);
  }, [onFetch]);

  useEffect(() => {
    if (onFetch !== '' && fetch) {
      setGallery([]);
      setStatus('pending');
      visible(true);
      resPage(true);
      Api(onFetch, 1)
        .then(e => {
          setGallery(e.hits);
          visible(false);
          if (e.hits.length === 0) {
            visible(true);
            return setStatus('rejected');
          }
          setStatus('resolve');
        })
        .catch(() => setStatus('rejected'))
        .finally(setFetch(false), setNumber(2));
    }
  }, [fetch, gallery, numberPage, onFetch, resPage, visible]);

  useEffect(() => {
    if (number === numberPage) {
      Api(onFetch, numberPage)
        .then(e => {
          setGallery([...gallery, ...e.hits]);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
          visible(false);
          if (e.hits.length === 0) {
            visible(true);
          }
          setStatus('resolve');
        })
        .catch(() => setStatus('rejected'))
        .finally(setNumber(number + 1));
    }
  }, [gallery, number, numberPage, onFetch, visible]);

  if (status === 'idle') {
    return (
      <li>
        <h1>Введите запрос</h1>
      </li>
    );
  }

  if (status === 'rejected') {
    return (
      <li>
        <h1>Запрос не найден</h1>
      </li>
    );
  }
  if (status === 'pending') {
    return (
      <li>
        <Loaders />
      </li>
    );
  }

  if (status === 'resolve') {
    return gallery.map(e => (
      <li key={e.id} className={s.ImageGalleryItem}>
        <img
          src={e.webformatURL}
          data-src={e.largeImageURL}
          alt="img"
          className={s.ImageGalleryItemImage}
          onClick={() => largeImageURL(e.largeImageURL)}
        />
      </li>
    ));
  }
}
ImageGalleryItem.propTypes = {
  visible: PropTypes.func.isRequired,
  resPage: PropTypes.func.isRequired,
  largeImageURL: PropTypes.func.isRequired,
  numberPage: PropTypes.number.isRequired,
  onFetch: PropTypes.string,
};
