import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loaders() {
  return (
    <Loader
      className={s.loader}
      type="Watch"
      color="#00BFFF"
      height={100}
      width={100}
    />
  );
}
