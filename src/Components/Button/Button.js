import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ pageNumber }) {
  const loadMore = () => {
    pageNumber();
  };

  return (
    <div className={s.ButtonDiv}>
      <button className={s.Button} onClick={loadMore}>
        Load more
      </button>
    </div>
  );
}
Button.propTypes = {
  pageNumber: PropTypes.func.isRequired,
};
