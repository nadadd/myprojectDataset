import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TechnicalCriteriaPage.css'; // Assurez-vous d'importer le CSS

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
      machine_learning_task: 'low',
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
    } else if (name === 'nb_citations_value') {
      setTechnicalCriteria({ ...technicalCriteria, nb_citations: value });
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
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      default:
        return 'priority-low';
    }
  };

  return (
    <div className="criteria-container">
      <h2>Technical Criteria</h2>
      <form>
        {/* Tableau des Critères */}
        <table className="criteria-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Criteria</th>
              <th>Definition</th>
              <th>Checkbox</th>
              <th>Priority</th>
              <th>Choices</th>
            </tr>
          </thead>
          <tbody>
            {/* Data Origin and Documentation */}
            <tr>
              <td rowSpan="3" className="category-cell"><strong>Data Origin and Documentation</strong></td>
              <td>Metadata</td>
              <td>provides contextual information about the data itself. This criterion enables us to understand the structure and characteristics of each dataset, which is essential for correctly interpreting the results and choosing the right analysis methods.</td>
              <td>
                <input
                  type="checkbox"
                  name="metadata"
                  checked={technicalCriteria.metadata}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.metadata)}
                />
              </td>
              <td>
                <select
                  name="priority_metadata"
                  value={technicalCriteria.priorities.metadata}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.metadata)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Documentation</td>
              <td>describes how data is described and organized, which is essential for its correct interpretation and</td>
              <td>
                <input
                  type="checkbox"
                  name="documentation"
                  checked={technicalCriteria.documentation}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="priority_documentation"
                  value={technicalCriteria.priorities.documentation}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.documentation)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Number of Citations</td>
              <td>Evaluates the popularity and recognition of the dataset in the scientific community.</td>
              <td>
                <input
                  type="checkbox"
                  name="nb_citations"
                  checked={technicalCriteria.nb_citations}
                  onChange={handleChange}
                 
                />
              </td>
              <td>
                <select
                  name="priority_nb_citations"
                  value={technicalCriteria.priorities.nb_citations}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.nb_citations)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  name="nb_citations_value"
                  value={technicalCriteria.nb_citations}
                  onChange={handleChange}
                />
              </td>

            </tr>

            {/* Data Features and Representativeness */}
            <tr>
              <td rowSpan="6" className="category-cell"><strong>Data Features and Representativeness</strong></td>
              <td>Data Representativeness</td>
              <td>indicates how the data is structured. Data can be structured, semi-structured, or unstructured. Data representativeness affects the way it is processed and analyzed, as well as the complexity of the models that can be used to explore it.</td>
              <td>
                <input
                  type="checkbox"
                  name="data_representativeness"
                  checked={technicalCriteria.data_representativeness}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="priority_data_representativeness"
                  value={technicalCriteria.priorities.data_representativeness}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.data_representativeness)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td>
                <select
                  name="data_representativeness"
                  value={technicalCriteria.data_representativeness}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="classification">Structured</option>
                  <option value="clustering">Semi-Structured</option>
                  <option value="regression">Non-Structured</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Sample Balance</td>
              <td>refers to the fair distribution of different categories or classes in the dataset. An imbalance can lead to biased ML models that favor the majority class, which can compromise the model's ability to generalize effectively. </td>
              <td>
                <input
                  type="checkbox"
                  name="sample_balance"
                  checked={technicalCriteria.sample_balance}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="priority_sample_balance"
                  value={technicalCriteria.priorities.sample_balance}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.sample_balance)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Divided</td>
              <td>Dividing the dataset is important to know whether the dataset has already been divided into training and test sets. This preliminary division facilitates model evaluation by reserving one part of the data for training and another for evaluation. However, inappropriate division can introduce bias or lead to unreliable assessments of model performance. </td>
              <td>
                <input
                  type="checkbox"
                  name="divided"
                  checked={technicalCriteria.divided}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="priority_divided"
                  value={technicalCriteria.priorities.divided}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.divided)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Missing Values</td>
              <td>Proper management of missing values helps maintain data integrity and avoid bias in analyses.</td>
              <td>
                <input
                  type="checkbox"
                  name="missing_values"
                  checked={technicalCriteria.missing_values}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="priority_missing_values"
                  value={technicalCriteria.priorities.missing_values}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.missing_values)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Temporal Factors</td>
              <td>temporal information is often relevant in educational data, as it enables us to understand the evolution of student behavior and performance over time. The presence of temporal features in the dataset may require specific analysis methods to take account of the temporal dimension and fully exploit the available information.</td>
              <td>
                <input
                  type="checkbox"
                  name="temporal_factors"
                  checked={technicalCriteria.temporal_factors}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="priority_temporal_factors"
                  value={technicalCriteria.priorities.temporal_factors}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.temporal_factors)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Features</td>
              <td>identify the different variables or measures included in the data set such as the demographic data, previous results , behavioral data such as participation and time spent on the platform , as well as responses to questionnaires. Understanding these features enables us to further explore the relationship between data and learning indicators. </td>
              <td>
                <input
                  type="checkbox"
                  name="features"
                  checked={technicalCriteria.features}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="priority_features"
                  value={technicalCriteria.priorities.features}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.features)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td>
                <select
                  name="features"
                  value={technicalCriteria.features}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="number_of_attempts">Number of Attempts</option>
                  <option value="number_of_views">Number of Views</option>
                  <option value="number_of_clicks">Number of Clicks</option>
                  <option value="time_spent">Time Spent</option>
                  <option value="number_of_messages">Number of Messages</option>
                  <option value="grades">Grades</option>
                  <option value="logins">Logins</option>
                </select>
              </td>
            </tr>
           
           
              {/* Analysis and Modeling */}
              <tr>
              <td rowSpan="3" className="category-cell"><strong>Analysis and Modeling</strong></td>
              <td>Machine Learning Task</td>
              <td>identifies the nature of the ML task associated with each dataset. Understanding the ML task is crucial to selecting appropriate algorithms and assessing the relevance of the dataset to meet our research objectives.</td>
              <td>
                <input
                  type="checkbox"
                  name="task"
                  checked={technicalCriteria.task}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="priority_task"
                  value={technicalCriteria.priorities.task}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.task)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td>
                <select
                  name="task"
                  value={technicalCriteria.task}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="classification">Classification</option>
                  <option value="clustering">Clustering</option>
                  <option value="regression">Regression</option>
                </select>
              </td>
              {/* <td>
                <input
                  type="text"
                  name="machine_learning_task"
                  value={technicalCriteria.machine_learning_task}
                  onChange={handleChange}
                />
              </td> */}
            </tr>
            <tr>
              <td>Learning Indicators</td>
              <td>Learning indicators evaluate student performance through exam results and engagement through cognitive effort, participation levels, emotional responses, and social interactions with peers.</td>
              <td>
                <input
                  type="checkbox"
                  name="learning_indicators"
                  checked={technicalCriteria.learning_indicators}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="priority_learning_indicators"
                  value={technicalCriteria.priorities.learning_indicators}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.learning_indicators)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td>
                <select
                  name="learning_indicators"
                  value={technicalCriteria.learning_indicators}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="performance">Performance</option>
                  <option value="behavioral_engagement">Behavioral Engagement</option>
                  <option value="social_engagement">Social Engagement</option>
                  <option value="perseverance">Perseverance</option>
                  <option value="cognitive_engagement">Cognitive Engagement</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Objective</td>
              <td>The specific purposes for which the dataset was created.</td>

              <td>
                <input
                  type="checkbox"
                  name="objective"
                  checked={technicalCriteria.objective}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="priority_objective"
                  value={technicalCriteria.priorities.objective}
                  onChange={handleChange}
                  className={getPriorityClass(technicalCriteria.priorities.objective)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td>
                <select
                  name="objective"
                  value={technicalCriteria.objective}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="students_satisfaction">Students' Satisfaction</option>
                  <option value="distance_learning_impact">Impact of Distance Learning</option>
                  <option value="improve_learning_quality">Improvement of Learning Quality</option>
                  <option value="mooc_recommendations">MOOC Recommendations</option>
                  <option value="students_preferences">Students' Preferences</option>
                  <option value="academic_performance">Academic Performance</option>
                  <option value="mental_health">Students' Mental Health</option>
                  <option value="covid_impact">Impact of COVID-19 on Students</option>
                </select>
              </td>
              
            </tr>
          </tbody>
        </table>
        <button type="button" className='submit-button' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default TechnicalCriteriaPage;








// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { MaterialReactTable } from 'material-react-table';
// import { Box, Button, TextField,  FormControlLabel, Select, MenuItem } from '@mui/material';

// const TechnicalCriteriaPage = () => {
//   const navigate = useNavigate();
//   const [technicalCriteria, setTechnicalCriteria] = useState({
//     objective: '',
//     features: '',
//     data_representativeness: '',
//     sample_balance: false,
//     divided: false,
//     missing_values: false,
//     temporal_factors: false,
//     nb_citations: 0,
//     task: '',
//     metadata: false,
//     documentation: false,
//     learning_indicators: '',
//     priorities: {
//       objective: 'low',
//       features: 'low',
//       data_representativeness: 'low',
//       task: 'low',
//       learning_indicators: 'low',
//       sample_balance: 'low',
//       divided: 'low',
//       missing_values: 'low',
//       temporal_factors: 'low',
//       metadata: 'low',
//       documentation: 'low',
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox') {
//       setTechnicalCriteria({ ...technicalCriteria, [name]: checked });
//     } else if (name.startsWith('priority_')) {
//       const criterion = name.replace('priority_', '');
//       setTechnicalCriteria({
//         ...technicalCriteria,
//         priorities: { ...technicalCriteria.priorities, [criterion]: value },
//       });
//     } else {
//       setTechnicalCriteria({ ...technicalCriteria, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       localStorage.setItem('technicalCriteriaSelected', JSON.stringify(technicalCriteria));
  
//       const ethicalCriteria = JSON.parse(localStorage.getItem('ethicalCriteriaSelected')) || {};
//       const combinedCriteria = { ...ethicalCriteria, ...technicalCriteria };

//       console.log('Submitting combined criteria:', combinedCriteria);
  
//       const response = await axios.post('http://127.0.0.1:8000/get-visualizations-data/', combinedCriteria);
  
//       console.log('Response from server:', response.data);
  
//       localStorage.setItem('visualizationsData', JSON.stringify(response.data));
//       navigate('/visualizations');
//     } catch (error) {
//       console.error('Error submitting data:', error.response ? error.response.data : error.message);
//       alert('There was an error submitting your request. Please check the console for more details.');
//     }
//   };

//   const columns = [
//     { accessorKey: 'category', header: 'Category' },
//     { accessorKey: 'criteria', header: 'Criteria' },
//     { accessorKey: 'definition', header: 'Definition' },
//     { accessorKey: 'checkbox', header: 'Checkbox' },
//     { accessorKey: 'priority', header: 'Priority' },
//     { accessorKey: 'choices', header: 'Choices' },
//   ];

//   const data = [
//     {
//       category: 'Data Origin and Documentation',
//       criteria: 'Metadata',
//       definition: 'Information about the data source.',
//       checkbox: technicalCriteria.metadata ? 'Yes' : 'No',
//       priority: technicalCriteria.priorities.metadata,
//       choices: '', // Add choices if applicable
//     },
//     {
//       category: 'Data Origin and Documentation',
//       criteria: 'Documentation',
//       definition: 'Documentation provided with the data.',
//       checkbox: technicalCriteria.documentation ? 'Yes' : 'No',
//       priority: technicalCriteria.priorities.documentation,
//       choices: '', // Add choices if applicable
//     },
//     // Add other criteria here
//   ];

//   return (
//     <div>
//       <h2>Technical Criteria</h2>
//       <Box sx={{ mb: 2 }}>
//         <MaterialReactTable columns={columns} data={data} />
//       </Box>
//       <form>
//         {/* Existing criteria */}
//         <div>
//           <TextField
//             label="Objective"
//             name="objective"
//             value={technicalCriteria.objective}
//             onChange={handleChange}
//             fullWidth
//             sx={{ mb: 2 }}
//           />
//           <FormControlLabel
//             control={
//               <Select
//                 name="priority_objective"
//                 value={technicalCriteria.priorities.objective}
//                 onChange={handleChange}
//                 fullWidth
//               >
//                 <MenuItem value="low">Low</MenuItem>
//                 <MenuItem value="medium">Medium</MenuItem>
//                 <MenuItem value="high">High</MenuItem>
//               </Select>
//             }
//             label="Priority"
//           />
//         </div>
//         {/* Add similar fields for other criteria */}
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default TechnicalCriteriaPage;




// import React, { useState } from 'react';
// import { useTable } from 'react-table';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const categories = {
//   'Data Origin and Documentation': [
//     { criteria: 'Metadata', definition: 'Metadata definition here' },
//     { criteria: 'Documentation', definition: 'Documentation definition here' },
//     { criteria: 'Nb Citations', definition: 'Number of citations definition here' },
//   ],
//   'Data Features and Representativeness': [
//     { criteria: 'Data Representativeness', definition: 'Data Representativeness definition here' },
//     { criteria: 'Sample Balance', definition: 'Sample Balance definition here' },
//     { criteria: 'Divided', definition: 'Divided definition here' },
//     { criteria: 'Missing Values', definition: 'Missing Values definition here' },
//     { criteria: 'Temporal Factors', definition: 'Temporal Factors definition here' },
//     { criteria: 'Features', definition: 'Features definition here' },
//   ],
//   'Analysis and Modeling': [
//     { criteria: 'ML Tasks', definition: 'Machine Learning Tasks definition here' },
//     { criteria: 'Learning Indicators', definition: 'Learning Indicators definition here' },
//     { criteria: 'Objective', definition: 'Objective definition here' },
//   ],
// };

// const TechnicalCriteriaPage = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState(() => {
//     const initialData = [];
//     Object.keys(categories).forEach((category) => {
//       categories[category].forEach((item) => {
//         initialData.push({
//           category,
//           ...item,
//           checkbox: false,
//           priority: 'low',
//         });
//       });
//     });
//     return initialData;
//   });

//   const handleCheckboxChange = (rowIndex, checked) => {
//     const updatedData = [...data];
//     updatedData[rowIndex].checkbox = checked;
//     setData(updatedData);
//   };

//   const handlePriorityChange = (rowIndex, priority) => {
//     const updatedData = [...data];
//     updatedData[rowIndex].priority = priority;
//     setData(updatedData);
//   };

//   const handleSubmit = async () => {
//     try {
//       const combinedCriteria = data.reduce((acc, item) => {
//         acc[item.criteria] = {
//           checkbox: item.checkbox,
//           priority: item.priority,
//         };
//         return acc;
//       }, {});

//       console.log('Submitting combined criteria:', combinedCriteria);

//       const response = await axios.post('http://127.0.0.1:8000/get-visualizations-data/', combinedCriteria);

//       console.log('Response from server:', response.data);

//       localStorage.setItem('visualizationsData', JSON.stringify(response.data));
//       navigate('/visualizations');
//     } catch (error) {
//       console.error('Error submitting data:', error.response ? error.response.data : error.message);
//       alert('There was an error submitting your request. Please check the console for more details.');
//     }
//   };

//   const columns = [
//     { Header: 'Category', accessor: 'category' },
//     { Header: 'Criteria', accessor: 'criteria' },
//     { Header: 'Definition', accessor: 'definition' },
//     {
//       Header: 'Checkbox',
//       accessor: 'checkbox',
//       Cell: ({ row: { index }, value }) => (
//         <input
//           type="checkbox"
//           checked={value}
//           onChange={(e) => handleCheckboxChange(index, e.target.checked)}
//         />
//       ),
//     },
//     {
//       Header: 'Priority Choices',
//       accessor: 'priority',
//       Cell: ({ row: { index }, value }) => (
//         <select
//           value={value}
//           onChange={(e) => handlePriorityChange(index, e.target.value)}
//         >
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//       ),
//     },
//   ];

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

//   return (
//     <div>
//       <h2>Technical Criteria</h2>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => (
//                   <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <button type="button" onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default TechnicalCriteriaPage;








// {/* <button type="submit" className="submit-button">Submit</button> */}

