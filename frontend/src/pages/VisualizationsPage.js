import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/VisualizationsPage.css'; // Import the CSS file

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
    <div className="visualizations-container">
      <h2>Visualizations</h2>
      <table className="visualizations-table">
        <thead>
          <tr>
            <th>Dataset Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item, index) => (
            <tr key={index}>
              <td>{item.dataset.name}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="back-home-button">
        <button>Back Home</button>
      </Link>
    </div>
  );
};

export default VisualizationsPage;
