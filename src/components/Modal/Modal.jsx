import style from './Modal.module.css';
import { useEffect } from 'react';
export const Modal = ({ tags, largeImageURL, closeModal }) => {
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  const handleEsc = e => {
    if (e.target.className === style.Overlay) {
      closeModal();
    }
  };

  return (
    <div className={style.Overlay} onClick={handleEsc}>
      <div className={style.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
