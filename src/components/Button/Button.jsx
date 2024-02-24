import style from './Button.module.css';

export const Button = ({ addPage }) => {
  return (
    <button type="submit" onClick={addPage} className={style.Button}>
      Load more
    </button>
  );
};
