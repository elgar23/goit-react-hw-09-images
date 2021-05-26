import { useState } from 'react';
import s from './App.module.css';
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Modal from '../src/Components/Modal/Modal';

const App = () => {
  const [search, setSearch] = useState('');
  const [datasrc, setDatasrc] = useState('');

  const onSubmit = e => {
    setSearch(e);
  };

  const largeImageURL = e => {
    setDatasrc(e);
  };

  return (
    <div className={s.App}>
      <Modal src={datasrc} />
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery onFetch={search} src={largeImageURL} />
    </div>
  );
};

export default App;
