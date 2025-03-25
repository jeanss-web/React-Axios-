const axios = require('axios');

function postAds(title, description, price, status) {
  axios.post('http://localhost:3000/api/ads', {
    title,
    description,
    price,
    status
  })
  .then(response => {
    
  })
  .catch(error => {
    if (error.response) {
      console.error('Данные ошибки:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Ошибка:', error.message);
    }
  });
}

// Вызов функции
postAds(
  'МЯУМЯУМЯeafafafУ', 
  'ваумяуfdsfsdfsd', 
  35678784, 
  'active'
);
