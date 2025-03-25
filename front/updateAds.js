const axios = require('axios');

const AdsUpdate = async (id, price, status) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/ads/${id}`, { price, status });
    return response.data;
  } catch (error) {
      console.error('Ошибка:', error.message);
    }
    return null;
  };

AdsUpdate(4, 34345636, 'inactive')
  .then(result => {
    if (result) {
      console.log('Результат', JSON.stringify(result, null, 2));
    }
  });
