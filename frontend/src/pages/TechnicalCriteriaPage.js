import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CriteriaPage.css';

const categories = {
  "Category 1 : Data Origin and Documentation": [
    { id: 1, name: 'Metadata' },
    { id: 2, name: 'Documentation' },
    { id: 3, name: 'Features' },
  ],
  "Category 2 : Learning Indicators": [
    { id: 4, name: 'Learning indicators' },
  ],
  "Category 3 : Relevance and Specificity": [
    { id: 5, name: 'Relevance and Specificity' },
  ],
  "Category 4 : Data Usability": [
    { id: 6, name: 'Task' },
    { id: 7, name: 'Missing values' },
    { id: 8, name: 'Divided' },
    { id: 9, name: 'Temporal Factors' },
  ],
};

const TechnicalCriteriaPage = () => {
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

    // Initialize priority to default when a criterion is selected
    if (!priorities[criterionId]) {
      setPriorities({
        ...priorities,
        [criterionId]: 0.5, // Default priority is "Low Priority"
      });
    }
  };

  const handlePriorityChange = (criterionId, priority) => {
    setPriorities({
      ...priorities,
      [criterionId]: parseFloat(priority),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('technicalCriteriaSelected', JSON.stringify(selectedCriteria));
    localStorage.setItem('technicalCriteriaPriorities', JSON.stringify(priorities));
    navigate('/ethical-criteria');
  };

  return (
    <div className="criteria-container">
      <h1 className="criteria-title">Technical Criteria</h1>
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

export default TechnicalCriteriaPage;

