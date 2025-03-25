const axios = require('axios');

const  getAdById  = async (id) =>{
    const data=await axios.get(`http://localhost:3000/api/ads/`+ id );
      console.log('Axios response:',data.data);
      return data.data;
};
getAdById(3); 



