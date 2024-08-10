import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VisualizationsPage = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const technicalCriteriaSelected = JSON.parse(localStorage.getItem('technicalCriteriaSelected')) || {};
        const ethicalCriteriaSelected = JSON.parse(localStorage.getItem('ethicalCriteriaSelected')) || {};

        const combinedCriteria = {
          ...ethicalCriteriaSelected,
          ...technicalCriteriaSelected,
        };

        const response = await axios.post('http://127.0.0.1:8000/get-visualizations-data/', combinedCriteria);
        setDataList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Visualizations</h2>
      <ul>
        {dataList.map((item, index) => (
          <li key={index}>
            <strong>Dataset Name:</strong> {item.dataset.name}<br />
            <strong>Score:</strong> {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisualizationsPage;
