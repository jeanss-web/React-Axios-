const axios = require('axios');


const AdsDelete = async (id) => {
  try {
      
      const response = await axios.delete(`http://localhost:3000/api/ads/${id}`);
      
     
      console.log('Axios response:', response.data);
      return response.data;
  } catch (error) {
      console.error('Ошибка', error.message);
      return null;
  }
};


AdsDelete(1);