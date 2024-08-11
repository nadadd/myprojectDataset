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
