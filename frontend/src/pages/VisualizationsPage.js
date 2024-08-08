
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VisualizationsPage = () => {
  // const [technicalCriteria, setTechnicalCriteria] = useState([]);
  // const [ethicalCriteria, setEthicalCriteria] = useState([]);
  const [datalist,setDataList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/get-visualizations-data/',{

        });
        setDataList(response.data)
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Visualizations</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {datalist.map((criterion) => (
            <tr key={criterion.dataset.id}>
              <td>{criterion.dataset.name}</td>
              <td>{criterion.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <h2>Ethical Criteria</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {ethicalCriteria.map((criterion) => (
            <tr key={criterion.criteria_id}>
              <td>{criterion.name}</td>
              <td>{criterion.priority}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default VisualizationsPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const VisualizationsPage = () => {
//   const [datalist, setDataList] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const technicalCriteriaSelected = JSON.parse(localStorage.getItem('technicalCriteriaSelected')) || [];
//       const ethicalCriteriaSelected = JSON.parse(localStorage.getItem('ethicalCriteriaSelected')) || [];
//       const technicalCriteriaPriorities = JSON.parse(localStorage.getItem('technicalCriteriaPriorities')) || {};
//       const ethicalCriteriaPriorities = JSON.parse(localStorage.getItem('ethicalCriteriaPriorities')) || {};
    
//       const combinedCriteria = {
//         technicalCriteriaSelected,
//         ethicalCriteriaSelected,
//         priorities: {
//           ...technicalCriteriaPriorities,
//           ...ethicalCriteriaPriorities
//         }
//       };
    
//       console.log('Sending data to backend:', combinedCriteria);  // Log the data being sent
    
//       try {
//         const response = await axios.post('http://127.0.0.1:8000/get-visualizations-data/', combinedCriteria);
//         console.log('Response data:', response.data);
    
//         response.data.results.forEach(item => {
//           console.log('Dataset name:', item.dataset.name, 'Score:', item.score);
//         });
    
//         setDataList(response.data.results);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData(); // Call fetchData

//   }, []);

//   return (
//     <div>
//       <h1>Visualizations</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {datalist.map((criterion) => (
//             <tr key={criterion.dataset.id}>
//               <td>{criterion.dataset.name}</td>
//               <td>{criterion.score}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default VisualizationsPage;








