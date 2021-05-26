import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
import img from '../../img/404_error.jpg';

export default function Modal({ src }) {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (src !== '') {
      setModal(true);
      window.addEventListener('keydown', e => {
        if (e.code === 'Escape') {
          setModal(false);
        }
      });
      window.addEventListener('click', e => {
        if (e.target.alt !== 'img') {
          setModal(false);
        }
      });
    }
    return () => {
      window.removeEventListener('keydown', e => {
        if (e.code === 'Escape') {
          setModal(false);
        }
      });
      window.removeEventListener('click', e => {
        if (e.target.alt !== 'img') {
          setModal(false);
        }
      });
    };
  }, [src]);
  return (
    modal && (
      <div className={s.Overlay}>
        <div className={s.Modal}>
          <img src={src} alt="img" />
        </div>
      </div>
    )
  );
}

Modal.defaultProps = {
  src: img,
};

Modal.propTypes = {
  src: PropTypes.string,
};
