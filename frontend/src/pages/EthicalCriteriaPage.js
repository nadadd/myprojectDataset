import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CriteriaPage.css';

const categories = {
  "Category 1 : Responsible Data Use": [
    { id: 1, name: 'Informed Consent' },
    { id: 2, name: 'Transparency' },
    { id: 3, name: 'User Control' },
  ],
  "Category 2 : quity and Non-discrimination": [
    { id: 4, name: 'Equity and Non-discrimination' },
  ],
  "Category 3 : Data Security": [
    { id: 5, name: 'Security' },
    { id: 6, name: 'Dealing with Faulty Data' },
    { id: 7, name: 'Anonymization' },
    { id: 8, name: 'Keeping a Record' },
  ],
  "Category 4 : Minimal Data Collection": [
    { id: 9, name: 'Minimal Data Collection' },
  ],
  "Category 5 : Data Lifecycle Management": [
    { id: 10, name: 'Data Lifecycle Management' },
  ],
};

const EthicalCriteriaPage = () => {
  const navigate = useNavigate();
  const [selectedCriteria, setSelectedCriteria] = useState({});
  const [priorities, setPriorities] = useState({});

  const handleCriteriaChange = (category, criterionId) => {
    const selectedInCategory = selectedCriteria[category] || [];
    const isSelected = selectedInCategory.includes(criterionId);
    const updatedSelected = isSelected
      ? selectedInCategory.filter(id => id !== criterionId)
      : [...selectedInCategory, criterionId];

    setSelectedCriteria({
      ...selectedCriteria,
      [category]: updatedSelected,
    });
  };

  const handlePriorityChange = (criterionId, priority) => {
    setPriorities({
      ...priorities,
      [criterionId]: priority,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('ethicalCriteriaSelected', JSON.stringify(selectedCriteria));
    localStorage.setItem('ethicalCriteriaPriorities', JSON.stringify(priorities));
    navigate('/visualizations');
  };

  return (
    <div className="criteria-container">
      <h1 className="criteria-title">Ethical Criteria</h1>
      <form className="criteria-form" onSubmit={handleSubmit}>
        {Object.keys(categories).map((category) => (
          <div key={category} className="category">
            <h2>{category}</h2>
            {categories[category].map((criterion) => (
              <div key={criterion.id} className="criterion">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCriteria[category]?.includes(criterion.id) || false}
                    onChange={() => handleCriteriaChange(category, criterion.id)}
                  />
                  {criterion.name}
                </label>
                {selectedCriteria[category]?.includes(criterion.id) && (
                  <select
                    value={priorities[criterion.id] || ''}
                    onChange={(e) => handlePriorityChange(criterion.id, e.target.value)}
                  >
                    <option value="">Select Priority</option>
                    <option value="0.5">Low Priority</option>
                    <option value="0.7">Medium Priority</option>
                    <option value="0.9">High Priority</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-button">Next</button>
      </form>
    </div>
  );
};

export default EthicalCriteriaPage;

