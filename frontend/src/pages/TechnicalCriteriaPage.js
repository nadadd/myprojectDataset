import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CriteriaPage.css';

const categories = {
  "Category 1 : Data Origin and Documentation": [
    { id: 1, name: 'Metadata' },
    { id: 2, name: 'Documentation' },
    { id: 3, name: 'Data Source' },
    { id: 4, name: 'Number of Citations' },
  ],
  "Category 2 : Data Features and Representativeness": [
    { id: 5, name: 'Temporal Information' },
    { id: 6, name: 'Data Representativeness' },
    { id: 7, name: 'Sample Balance' },
    { id: 8, name: 'Management of Missing Values' },
    { id: 9, name: 'Dividing the Dataset' },
    { id: 10, name: 'Features' },
  ],
  "Category 3 : Analysis and Modeling": [
    { id: 11, name: 'Machine Learning Tasks' },
    { id: 12, name: 'Learning Indicators' },
    { id: 13, name: 'Objective' },
  ],
};

const dropdownOptions = {
  'machine_learning_tasks': [
    { value: 'classification', label: 'Classification' },
    { value: 'clustering', label: 'Clustering' },
    { value: 'regression', label: 'Regression' },
  ],
  'learning_indicators': [
    { value: 'performance', label: 'Performance' },
    { value: 'behavioral_engagement', label: 'Behavioral Engagement' },
    { value: 'social_engagement', label: 'Social Engagement' },
    { value: 'perseverance', label: 'Perseverance' },
    { value: 'cognitive_engagement', label: 'Cognitive Engagement' },
  ],
  'features': [
    { value: 'number_of_attempts', label: 'Number of attempts in quiz or exam' },
    { value: 'number_of_views', label: 'Number of views' },
    { value: 'number_of_clicks', label: 'Number of clicks' },
    { value: 'time_spent', label: 'Time spent' },
    { value: 'number_of_messages', label: 'Number of messages' },
    { value: 'grades', label: 'Grades' },
    { value: 'logins', label: 'Logins' },
  ],
  'data_representativeness': [
    { value: 'structured', label: 'Structured' },
    { value: 'semi_structured', label: 'Semi-structured' },
    { value: 'non_structured', label: 'Non-structured' },
  ],
  'objective': [
    { value: 'students_satisfaction', label: 'Students’ satisfaction' },
    { value: 'impact_of_distance_learning', label: 'Impact of distance learning' },
    { value: 'improvement_of_distance_learning_quality', label: 'Improvement of distance learning quality' },
    { value: 'recommendations_in_moocs', label: 'Recommendations in MOOCs' },
    { value: 'students_preferences', label: 'Students’ preferences' },
    { value: 'academic_performance', label: 'Academic performance' },
    { value: 'students_mental_health', label: 'Students’ mental health' },
    { value: 'impact_of_covid_19_on_students', label: 'Impact of COVID-19 on students' },
  ],
};

const TechnicalCriteriaPage = () => {
  const navigate = useNavigate();
  const [selectedCriteria, setSelectedCriteria] = useState({});
  const [priorities, setPriorities] = useState({});
  const [dropdownSelections, setDropdownSelections] = useState({});
  const [numberOfCitations, setNumberOfCitations] = useState({ min: '', max: '' });

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

    if (!priorities[criterionId]) {
      setPriorities({
        ...priorities,
        [criterionId]: 0.5,
      });
    }
  };

  const handlePriorityChange = (criterionId, priority) => {
    setPriorities({
      ...priorities,
      [criterionId]: parseFloat(priority),
    });
  };

  const handleDropdownChange = (criterionId, criterionName, value) => {
    setDropdownSelections({
      ...dropdownSelections,
      [criterionId]: value,
    });

    if (!priorities[criterionId]) {
      setPriorities({
        ...priorities,
        [criterionId]: 0.5,
      });
    }
  };

  const handleCitationsChange = (type, value) => {
    setNumberOfCitations({
      ...numberOfCitations,
      [type]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('technicalCriteriaSelected', JSON.stringify(
      Object.keys(selectedCriteria).flatMap(category =>
        selectedCriteria[category].map(id => ({
          category,
          id,
          name: categories[category].find(c => c.id === id).name,
          priority: priorities[id],
          dropdown_value: dropdownSelections[id],
          citation_min: numberOfCitations.min,
          citation_max: numberOfCitations.max
        }))
      )
    ));
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
            {categories[category].map((criterion) => {
              return (
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
                    <>
                      {criterion.name === 'Number of Citations' ? (
                        <div className="citation-inputs">
                          <input
                            type="number"
                            placeholder="Min"
                            value={numberOfCitations.min}
                            onChange={(e) => handleCitationsChange('min', e.target.value)}
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={numberOfCitations.max}
                            onChange={(e) => handleCitationsChange('max', e.target.value)}
                          />
                        </div>
                      ) : dropdownOptions[criterion.name.toLowerCase().replace(/ /g, '_')] ? (
                        <>
                          <select
                            value={dropdownSelections[criterion.id] || ''}
                            onChange={(e) => handleDropdownChange(criterion.id, criterion.name, e.target.value)}
                          >
                            <option value="">Select {criterion.name}</option>
                            {dropdownOptions[criterion.name.toLowerCase().replace(/ /g, '_')].map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                          <select
                            value={priorities[criterion.id] || ''}
                            onChange={(e) => handlePriorityChange(criterion.id, e.target.value)}
                          >
                            <option value="">Select Priority</option>
                            <option value="0.5">Low Priority</option>
                            <option value="0.7">Medium Priority</option>
                            <option value="0.9">High Priority</option>
                          </select>
                        </>
                      ) : (
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
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <button type="submit" className="submit-button">Next</button>
      </form>
    </div>
  );
};

export default TechnicalCriteriaPage;
