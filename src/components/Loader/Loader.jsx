import style from './Loader.module.css';
import { ColorRing } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={style.LoaderContainer}>
      <ColorRing
        visible={true}
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        wrapperClass={style.ColorRing}
      />
    </div>
  );
};
