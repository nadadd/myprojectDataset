import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Fonction pour calculer la distance euclidienne pondérée en prenant en compte tous les critères
const calculateWeightedEuclideanDistance = (userCriteria, datasets, priorities) => {
  const weights = { 'low': 0.5, 'medium': 0.7, 'high': 0.9 };

  const computeDistance = (dataset) => {
    let weightedSum = 0;
    for (let key in userCriteria) {
      if (key in dataset) {
        const userValue = userCriteria[key];
        const datasetValue = dataset[key];
        const priority = weights[priorities[key] || 'low'];
        const diff = userValue - datasetValue;
        weightedSum += priority * (diff ** 2);
      }
    }
    return Math.sqrt(weightedSum);
  };

  return datasets.map(dataset => ({
    ...dataset,
    totalDistance: computeDistance(dataset)
  }));
};

function VisualizationsPage() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        // Récupérer les critères techniques et éthiques
        const technicalCriteria = JSON.parse(localStorage.getItem('technicalCriteriaSelected')) || {};
        const ethicalCriteria = JSON.parse(localStorage.getItem('ethicalCriteriaSelected')) || {};
        const criteriaPriorities = JSON.parse(localStorage.getItem('criteriaPriorities')) || {};

        // Fusionner les critères techniques et éthiques
        const combinedCriteria = { ...technicalCriteria, ...ethicalCriteria };

        const response = await axios.get('http://127.0.0.1:8000/api/datasets/');

        // Calculer les distances pour tous les datasets
        let sortedDatasets = calculateWeightedEuclideanDistance(combinedCriteria, response.data, criteriaPriorities)
          .sort((a, b) => a.totalDistance - b.totalDistance); // Tri par distance

        if (sortedDatasets.length > 0) {
          setDatasets(sortedDatasets);
        } else {
          const defaultDataset = {
            id: 1,
            name: '2022dataset',
            description: 'Default dataset when no criteria selected or no dataset matches the criteria',
          };
          setDatasets([defaultDataset]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching datasets:', error);
        setLoading(false);
      }
    };

    fetchDatasets();
  }, []);

  return (
    <div className="visualizations-container">
      <h1 className="visualizations-title">Visualizations</h1>
      <div className="visualizations-content">
        <p>Visualizations based on the chosen criteria will be displayed below:</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {datasets.map(dataset => (
              <li key={dataset.id}>
                <h3>{dataset.name}</h3>
                <p>{dataset.description}</p>
                <p>Priority Score: {dataset.totalDistance !== undefined ? dataset.totalDistance.toFixed(2) : 'N/A'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default VisualizationsPage;






