import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/ads');
        setAds(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) return <div style={styles.loading}>Загрузка...</div>;
  if (error) return <div style={styles.error}>Ошибка: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Список объявлений</h2>
      <Link to="/update" style={styles.createLink}>Создать новое объявление</Link>
      
      <div style={styles.list}>
        {ads.map(ad => (
          <div key={ad.id} style={styles.card}>
            <h3 style={styles.adTitle}>{ad.title || `Объявление #${ad.id}`}</h3>
            <p style={styles.adPrice}>Цена: {ad.price} ₽</p>
            <p style={styles.adStatus}>Статус: {ad.status}</p>
            <Link to={`/update?id=${ad.id}`} style={styles.editLink}>
              Редактировать
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  },
  title: {
    textAlign: 'center',
    color: '#333'
  },
  createLink: {
    display: 'inline-block',
    margin: '10px 0 20px',
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px'
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  adTitle: {
    marginTop: '0',
    color: '#333'
  },
  adPrice: {
    color: '#2e7d32',
    fontWeight: 'bold'
  },
  adStatus: {
    color: '#666'
  },
  editLink: {
    display: 'inline-block',
    marginTop: '10px',
    color: '#1976d2',
    textDecoration: 'none'
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#ffebee'
  }
};

export default AdsList;
