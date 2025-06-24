import React, { useEffect, useState } from 'react';
import AddVegetableForm from './AddVegetableForm.jsx';
import api from "../api";

const VegetableList = () => {
  const [vegetables, setVegetables] = useState([]);

  const fetchVegetables = async () => {
    try {
      const response = await api.get('/vegetables');
      setVegetables(response.data.vegetables);
    } catch (error) {
      console.error('Error fetching vegetables:', error);
    }
  };

  const addVegetable = async (vegetableName) => {
    try {
      await api.post('/vegetables', { name: vegetableName });
      fetchVegetables(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding vegetable:', error);
    }
  };

  useEffect(() => {
    fetchVegetables();
  }, []);

  return (
    <div>
      <h2>Vegetable List</h2>
      <ul>
        {vegetables.map((vegetable, index) => (
          <li key={index}>{vegetable.name}</li>
        ))}
      </ul>
      <AddVegetableForm addVegetable={addVegetable} />
    </div>
  );
};

export default VegetableList;
