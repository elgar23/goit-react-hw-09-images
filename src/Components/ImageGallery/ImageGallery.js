import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ImageGallery = ({ src, onFetch }) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);

  const largeImageURL = e => {
    src(e);
  };

  const visibl = length => {
    setVisible(!length);
  };

  const pageNumber = e => {
    setPage(page + 1);
  };

  const resPage = e => {
    if (e) {
      setPage(1);
    }
  };

  return (
    <div>
      <ul className={s.ImageGallery}>
        <ImageGalleryItem
          onFetch={onFetch}
          largeImageURL={largeImageURL}
          visible={visibl}
          numberPage={page}
          resPage={resPage}
          qq={visible}
        />
      </ul>
      {visible && <Button pageNumber={pageNumber} />}
    </div>
  );
};

ImageGallery.propTypes = {
  onFetch: PropTypes.string,
  src: PropTypes.func,
};

export default ImageGallery;
