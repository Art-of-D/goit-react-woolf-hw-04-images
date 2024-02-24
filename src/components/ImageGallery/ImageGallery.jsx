import style from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { v1 as uuidv1 } from 'uuid';

export const ImageGallery = ({ imageList, openImage }) => {
  return (
    <ul className={style.ImageGallery}>
      {imageList.map(image => (
        <ImageGalleryItem
          key={image.id + uuidv1()}
          image={image}
          openImage={openImage}
        />
      ))}
    </ul>
  );
};
