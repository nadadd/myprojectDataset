// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/'; // Remplacez par l'URL de votre API

// Fonction pour obtenir les données de visualisation
export const getVisualizationsData = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}get-visualizations-data/`,{test:'test'});
    return response.data;
  } catch (error) {
    console.error('Error fetching visualizations data:', error);
    throw error;
  }
};

// Fonction pour soumettre les critères techniques
export const submitTechnicalCriteria = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}technical-criteria/`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting technical criteria:', error);
    throw error;
  }
};

// Fonction pour soumettre les critères éthiques
export const submitEthicalCriteria = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}ethical-criteria/`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting ethical criteria:', error);
    throw error;
  }
};

// Ajoutez d'autres fonctions d'appel API ici si nécessaire
