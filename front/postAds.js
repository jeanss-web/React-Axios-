const axios = require('axios');

const  getAdById  = async (id) =>{
    try {
    const data=await axios.post(`http://localhost:3000/api/ads`+ id );
      console.log('Axios response:',data.data);
      return data.data;
    } catch (error) {
        console.error('Ошибка', error.message);
        return null;
      }
};
getAdById(1); 