import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import style from './App.module.css';
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { getImagesByTag } from '../service/pixabay/getImages';
import { Loader } from './Loader/Loader';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const App = () => {
  const [imageList, setImageList] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [total, setTotal] = useState(0);
  const [per_page, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [zoomImage, setZoomImage] = useState(false);
  const [tags, setTags] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading();
    if (searchWord !== '') {
      (async () => {
        try {
          const { hits, total } = await getImagesByTag(
            searchWord,
            page,
            per_page
          );
          setImageList(prevImageList => [...prevImageList, ...hits]);
          setTotal(total);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      })();
    }
    return scrollToEnd();
  }, [page, per_page, searchWord]);

  useLayoutEffect(() => {
    if (imageList.length > 0) {
      scrollToEnd();
    }
  }, [imageList]);

  const addPage = () => {
    setPage(page + 1);
  };

  const addSearchWord = searchWord => {
    setSearchWord(searchWord);
    setImageList([]);
    setTotal(0);
    setPerPage(10);
    setPage(1);
    setZoomImage(false);
    setTags('');
    setLargeImageURL('');
    setLoading(true);
    setError('');
  };

  const openImage = ({ tags, largeImageURL }) => {
    setZoomImage(true);
    setTags(tags);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setZoomImage(false);
    setTags('');
    setLargeImageURL('');
  };

  const scrollToEnd = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <AppContext.Provider value={openImage}>
      <div className={style.AppBody}>
        <Searchbar addSearchWord={addSearchWord} />
        {error && <div>Error: {error}</div>}
        {imageList.length > 0 && <ImageGallery imageList={imageList} />}
        {loading && <Loader />}
        {total / per_page >= page && !loading && <Button addPage={addPage} />}
        {zoomImage && (
          <Modal
            zoomImage={zoomImage}
            tags={tags}
            largeImageURL={largeImageURL}
            closeModal={closeModal}
          />
        )}
      </div>
    </AppContext.Provider>
  );
};
