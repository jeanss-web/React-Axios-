
import React, { useState } from 'react';
import axios from 'axios';

const AdsUpdateForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    price: '',
    status: 'active'
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.put(`http://localhost:3000/api/ads/${formData.id}`,{
        price: Number(formData.price),
        status: formData.status
      });
      setResult(response.data);
      setFormData({ id: '', price: '', status: 'active' });   
    } catch (error) {
      console.error('Ошибка:', error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    title: {
      textAlign: 'center',
      color: '#333'
    },
    form: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s'
    },
    buttonHover: {
      backgroundColor: '#45a049'
    },
    error: {
      color: 'red',
      marginTop: '20px',
      padding: '10px',
      backgroundColor: '#ffebee',
      borderRadius: '4px'
    },
    result: {
      marginTop: '20px',
      padding: '15px',
      backgroundColor: '#e8f5e9',
      borderRadius: '4px'
    },
    pre: {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Обновление объявления</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="id" style={styles.label}>ID объявления:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="price" style={styles.label}>Новая цена:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="status" style={styles.label}>Статус:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="active">Активно</option>
            <option value="inactive">Неактивно</option>
            <option value="pending">На модерации</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          style={styles.button}
        >
          {isLoading ? 'Обновление...' : 'Обновить'}
        </button>
      </form>


{error && (
        <div style={styles.error}>
          Ошибка: {error}
        </div>
      )}

      {result && (
        <div style={styles.result}>
          <h3>Результат обновления:</h3>
          <pre style={styles.pre}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AdsUpdateForm;
