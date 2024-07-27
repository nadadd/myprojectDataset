import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VisualizationsPage = () => {
  const [technicalCriteria, setTechnicalCriteria] = useState([]);
  const [ethicalCriteria, setEthicalCriteria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/get-visualizations-data/');
        setTechnicalCriteria(response.data.technicalCriteria);
        setEthicalCriteria(response.data.ethicalCriteria);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Visualizations</h1>
      
      <h2>Technical Criteria</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Criteria ID</th>
            <th>Name</th>
            <th>Priority</th>
            <th>Citation Min</th>
            <th>Citation Max</th>
            <th>Dropdown Value</th>
          </tr>
        </thead>
        <tbody>
          {technicalCriteria.map((criterion) => (
            <tr key={criterion.criteria_id}>
              <td>{criterion.category}</td>
              <td>{criterion.criteria_id}</td>
              <td>{criterion.name}</td>
              <td>{criterion.priority}</td>
              <td>{criterion.citation_min !== null ? criterion.citation_min : '-'}</td>
              <td>{criterion.citation_max !== null ? criterion.citation_max : '-'}</td>
              <td>{criterion.dropdown_value || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Ethical Criteria</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Criteria ID</th>
            <th>Name</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {ethicalCriteria.map((criterion) => (
            <tr key={criterion.criteria_id}>
              <td>{criterion.category}</td>
              <td>{criterion.criteria_id}</td>
              <td>{criterion.name}</td>
              <td>{criterion.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisualizationsPage;
