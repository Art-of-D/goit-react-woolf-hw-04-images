import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const key = '38056621-1e45eaa8a2746a320c832ca9a';

const getImagesByTag = async (searchWord, page, per_page) => {
  try {
    const data = await axios('/', {
      params: {
        key: key,
        per_page: per_page,
        q: searchWord,
        page: page,
        image_type: 'photo',
      },
    });
    return data.data;
  } catch (e) {
    throw e;
  }
};

export { getImagesByTag };
