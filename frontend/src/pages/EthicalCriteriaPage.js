import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CriteriaPage.css';

const ethicalCategories = [
  'Informed Consent',
  'Transparency',
  'User Control',
  'Equity and Non-discrimination',
  'Security',
  'Dealing with Faulty Data',
  'Anonymization',
  'Keeping a Record',
  'Minimal Data Collection',
  'Data Lifecycle Management',
  'Metadata',
  'Documentation',
  'Features',
  'Learning indicators',
  'Relevance and Specificity',
  'Task',
  'Missing values',
  'Divided',
  'Temporal Factors',
];

const EthicalCriteriaPage = () => {
  const navigate = useNavigate();
  const [selectedCriteria, setSelectedCriteria] = useState({});
  const [priorities, setPriorities] = useState({});

  const handleCriteriaChange = (criterion) => {
    setSelectedCriteria({
      ...selectedCriteria,
      [criterion]: !selectedCriteria[criterion],
    });

    if (!priorities[criterion]) {
      setPriorities({
        ...priorities,
        [criterion]: 0.5,
      });
    }
  };

  const handlePriorityChange = (criterion, priority) => {
    setPriorities({
      ...priorities,
      [criterion]: parseFloat(priority),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('ethicalCriteriaSelected', JSON.stringify(
      ethicalCategories.filter(c => selectedCriteria[c]).map(c => ({
        criterion: c,
        priority: priorities[c],
      }))
    ));
    localStorage.setItem('ethicalCriteriaPriorities', JSON.stringify(priorities));
    navigate('/visualizations');
  };

  return (
    <div className="criteria-container">
      <h1 className="criteria-title">Ethical Criteria</h1>
      <form className="criteria-form" onSubmit={handleSubmit}>
        {ethicalCategories.map((criterion) => (
          <div key={criterion} className="criterion">
            <label>
              <input
                type="checkbox"
                checked={selectedCriteria[criterion] || false}
                onChange={() => handleCriteriaChange(criterion)}
              />
              {criterion}
            </label>
            {selectedCriteria[criterion] && (
              <select
                value={priorities[criterion] || ''}
                onChange={(e) => handlePriorityChange(criterion, e.target.value)}
              >
                <option value="">Select Priority</option>
                <option value="0.5">Low Priority</option>
                <option value="0.7">Medium Priority</option>
                <option value="0.9">High Priority</option>
              </select>
            )}
          </div>
        ))}
        <button type="submit" className="submit-button">Next</button>
      </form>
    </div>
  );
};

export default EthicalCriteriaPage;
