const axios = require('axios');

const getAllAds = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/ads`);
      console.log('Все данные:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('Ошибка', error.message);
      return null;
    }
  };
  
  getAllAds();

