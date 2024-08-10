import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TechnicalCriteriaPage = () => {
  const navigate = useNavigate();
  const [technicalCriteria, setTechnicalCriteria] = useState({
    objective: '',
    features: '',
    data_representativeness: '',
    sample_balance: false,
    divided: false,
    missing_values: false,
    temporal_factors: false,
    nb_citations: 0,
    task: '',
    metadata: false,
    documentation: false,
    learning_indicators: '',
    priorities: {
      objective: 'low',
      features: 'low',
      data_representativeness: 'low',
      task: 'low',
      learning_indicators: 'low',
      sample_balance: 'low',
      divided: 'low',
      missing_values: 'low',
      temporal_factors: 'low',
      metadata: 'low',
      documentation: 'low',
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setTechnicalCriteria({ ...technicalCriteria, [name]: checked });
    } else if (name.startsWith('priority_')) {
      const criterion = name.replace('priority_', '');
      setTechnicalCriteria({
        ...technicalCriteria,
        priorities: { ...technicalCriteria.priorities, [criterion]: value },
      });
    } else {
      setTechnicalCriteria({ ...technicalCriteria, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      localStorage.setItem('technicalCriteriaSelected', JSON.stringify(technicalCriteria));
  
      const ethicalCriteria = JSON.parse(localStorage.getItem('ethicalCriteriaSelected')) || {};
      const combinedCriteria = { ...ethicalCriteria, ...technicalCriteria };

      console.log('Submitting combined criteria:', combinedCriteria);
  
      const response = await axios.post('http://127.0.0.1:8000/get-visualizations-data/', combinedCriteria);
  
      console.log('Response from server:', response.data);
  
      localStorage.setItem('visualizationsData', JSON.stringify(response.data));
      navigate('/visualizations');
    } catch (error) {
      console.error('Error submitting data:', error.response ? error.response.data : error.message);
      alert('There was an error submitting your request. Please check the console for more details.');
    }
  };

  return (
    <div>
      <h2>Technical Criteria</h2>
      <form>
        {/* Existing criteria */}
        <div>
          <label>Objective:</label>
          <input
            type="text"
            name="objective"
            value={technicalCriteria.objective}
            onChange={handleChange}
          />
          <div>
            <label>
              Priority:
              <select
                name="priority_objective"
                value={technicalCriteria.priorities.objective}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <label>Features:</label>
          <input
            type="text"
            name="features"
            value={technicalCriteria.features}
            onChange={handleChange}
          />
          <div>
            <label>
              Priority:
              <select
                name="priority_features"
                value={technicalCriteria.priorities.features}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <label>Data Representativeness:</label>
          <input
            type="text"
            name="data_representativeness"
            value={technicalCriteria.data_representativeness}
            onChange={handleChange}
          />
          <div>
            <label>
              Priority:
              <select
                name="priority_data_representativeness"
                value={technicalCriteria.priorities.data_representativeness}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <label>Task:</label>
          <input
            type="text"
            name="task"
            value={technicalCriteria.task}
            onChange={handleChange}
          />
          <div>
            <label>
              Priority:
              <select
                name="priority_task"
                value={technicalCriteria.priorities.task}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <label>Learning Indicators:</label>
          <input
            type="text"
            name="learning_indicators"
            value={technicalCriteria.learning_indicators}
            onChange={handleChange}
          />
          <div>
            <label>
              Priority:
              <select
                name="priority_learning_indicators"
                value={technicalCriteria.priorities.learning_indicators}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        {/* New criteria */}
        <div>
          <label>Sample Balance:</label>
          <input
            type="checkbox"
            name="sample_balance"
            checked={technicalCriteria.sample_balance}
            onChange={handleChange}
          />
          <div>
            <label>
              Priority:
              <select
                name="priority_sample_balance"
                value={technicalCriteria.priorities.sample_balance}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <label>Divided:</label>
          <input
            type="checkbox"
            name="divided"
            checked={technicalCriteria.divided}
            onChange={handleChange}
          />
          <div>
            <label>
              Priority:
              <select
                name="priority_divided"
                value={technicalCriteria.priorities.divided}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <label>Missing Values:</label>
          <input
            type="checkbox"
            name="missing_values"
            checked={technicalCriteria.missing_values}
            onChange={handleChange}
          />
          <div>
            <label>
              Priority:
              <select
                name="priority_missing_values"
                value={technicalCriteria.priorities.missing_values}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <label>Temporal Factors:</label>
          <input
            type="checkbox"
            name="temporal_factors"
            checked={technicalCriteria.temporal_factors}
            onChange={handleChange}
          />
          <div>
            <label>
              Priority:
              <select
                name="priority_temporal_factors"
                value={technicalCriteria.priorities.temporal_factors}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <label>Number of Citations:</label>
          <input
            type="number"
            name="nb_citations"
            value={technicalCriteria.nb_citations}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Metadata:</label>
          <input
            type="checkbox"
            name="metadata"
            checked={technicalCriteria.metadata}
            onChange={handleChange}
          />
          <div>
            <label>
              Priority:
              <select
                name="priority_metadata"
                value={technicalCriteria.priorities.metadata}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <label>Documentation:</label>
          <input
            type="checkbox"
            name="documentation"
            checked={technicalCriteria.documentation}
            onChange={handleChange}
          />
          <div>
            <label>
              Priority:
              <select
                name="priority_documentation"
                value={technicalCriteria.priorities.documentation}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default TechnicalCriteriaPage;
