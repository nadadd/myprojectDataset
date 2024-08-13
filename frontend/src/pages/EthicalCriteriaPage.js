import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EthicalCriteriaPage.css"; // Assurez-vous d'importer le fichier CSS

const EthicalCriteriaPage = () => {
  const navigate = useNavigate();
  const [ethicalCriteria, setEthicalCriteria] = useState({
    security: false,
    informed_consent: false,
    transparency: false,
    user_control: false,
    equity_non_discrimination: false,
    dealing_faulty_data: false,
    anonymization: false,
    keeping_record: false,
    minimal_data_collection: false,
    data_lifecycle_management: false,
    priorities: {
      security: "low",
      informed_consent: "low",
      transparency: "low",
      user_control: "low",
      equity_non_discrimination: "low",
      dealing_faulty_data: "low",
      anonymization: "low",
      keeping_record: "low",
      minimal_data_collection: "low",
      data_lifecycle_management: "low",
    },
  });

  const definitions = {
    security: "Several measures can be applied to guarantee the security of collected data to prevent any unauthorized access or breach of confidentiality such as data encryption and the use of a firewall, as well as many others.",
    informed_consent: "Particiants must be informed of the purpose for which their data is collected, how it is used, and their right to withdraw at any time.",
    transparency: "Educational institutions must communicate their data processing practices and even the algorithms that will be applied to students from the very beginning. They must also be informed of the duration of data storage and the mesures to be applied in the case of transfer to another country.",
    user_control: "Participants are given the right to oversee their data, which means they have the power to make decisions about the collection, use, storage, and sharing of their personal information. They also have the right to rectify any information deemed inaccurate or incomplete, to object at any time to the processing of their data and even request the deletion of their data.",
    equity_non_discrimination: "The collected data reflects in a balanced way the diversity of participants within the same study population to guarantee fairness and avoid discriminatory results within a context of respect for the fundamental rights of all individuals.",
    dealing_faulty_data: "The use of faulty data has the potential to distort research findings and erroneous decision-making, leading to significant problems. It's essential to admit the presence of incorrect data, and to carry out regular data cleansing to prevent errors. To detect data inaccuracies, gaps, and inconsistencies quickly, validation and quality control should be integrated into the data collection process.",
    anonymization: "This criterion aims to avoid the usurpation of the identity of the various students whose data has been collected and to protect the privacy of individuals.",
    keeping_record: "Keeping information collected for longer than necessary poses potential risks to the privacy of individuals, even exposing them to the threat of identity theft. It is therefore very important to establish from the very start how long the data collected will be stored.",
    minimal_data_collection: "This criterion focuses on limiting the amount of data collected, restricting it within the limits of use, and refraining from collecting superfluous or sensitive data that is not directly relevant to the intended purpose, to avoid the risk of data breaches, and demonstrating commitment to responsible and ethical management practices.",
    data_lifecycle_management: "The main aim of this practice is to promote transparency, accountability, and security, while helping to maintain the integrity and quality of the data used in research, by establishing a practice of deleting data that is no longer needed or no longer serves the ultimate purpose of the research throughout the data processing cycle."
  };

  const categories = {
    Privacy: ["informed_consent", "anonymization"],
    Data: ["dealing_faulty_data", "minimal_data_collection", "data_lifecycle_management"],
    Transparency: ["transparency"],
    Security: ["security"],
    User_in_the_loop: ["user_control", "keeping_record"],
    Equity_and_non_discrimination: ["equity_non_discrimination"]
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEthicalCriteria({ ...ethicalCriteria, [name]: checked });
    } else if (name.startsWith("priority_")) {
      const criterion = name.replace("priority_", "");
      setEthicalCriteria({
        ...ethicalCriteria,
        priorities: { ...ethicalCriteria.priorities, [criterion]: value },
      });
    }
  };

  const handleNext = () => {
    localStorage.setItem(
      "ethicalCriteriaSelected",
      JSON.stringify(ethicalCriteria)
    );
    navigate("/technical-criteria");
  };

  // Fonction pour obtenir la classe de priorité
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "low":
        return "low-priority";
      case "medium":
        return "medium-priority";
      case "high":
        return "high-priority";
      default:
        return "";
    }
  }; 

  return (
    <div className="criteria-container">
      <h2>Ethical Criteria</h2>
      <form>
        <table className="criteria-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Criteria</th>
              <th>Definition</th>
              <th>Checkbox</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(categories).map(([category, criteriaList]) => (
              <React.Fragment key={category}>
                {criteriaList.map((criterion, idx) => (
                  <tr key={criterion} className="criteria-row">
                    {idx === 0 && (
                      <td rowSpan={criteriaList.length} className="category-cell">
                       <strong> {category.replace(/_/g, " ")}</strong>
                      </td>
                    )}
                    <td>{criterion.replace(/_/g, " ")}</td>
                    <td>{definitions[criterion]}</td>
                    <td>
                      <input
                        type="checkbox"
                        name={criterion}
                        checked={ethicalCriteria[criterion]}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <select
                        name={`priority_${criterion}`}
                        value={ethicalCriteria.priorities[criterion]}
                        onChange={handleChange}
                        className={getPriorityClass(ethicalCriteria.priorities[criterion])}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="spacing"></div> {/* Conteneur d'espacement */}
<div className="buttons-container">
  <button type="button" className="next-button" onClick={handleNext}>Next</button>
</div>
      </form>
    </div>
  );
};  

export default EthicalCriteriaPage;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const EthicalCriteriaPage = () => {
//   const navigate = useNavigate();
//   const [ethicalCriteria, setEthicalCriteria] = useState({
//     security: false,
//     informed_consent: false,
//     transparency: false,
//     user_control: false,
//     equity_non_discrimination: false,
//     dealing_faulty_data: false,
//     anonymization: false,
//     keeping_record: false,
//     minimal_data_collection: false,
//     data_lifecycle_management: false,
//     priorities: {
//       security: "low",
//       informed_consent: "low",
//       transparency: "low",
//       user_control: "low",
//       equity_non_discrimination: "low",
//       dealing_faulty_data: "low",
//       anonymization: "low",
//       keeping_record: "low",
//       minimal_data_collection: "low",
//       data_lifecycle_management: "low",
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setEthicalCriteria({ ...ethicalCriteria, [name]: checked });
//     } else if (name.startsWith("priority_")) {
//       const criterion = name.replace("priority_", "");
//       setEthicalCriteria({
//         ...ethicalCriteria,
//         priorities: { ...ethicalCriteria.priorities, [criterion]: value },
//       });
//     }
//   };

//   const handleNext = () => {
//     localStorage.setItem(
//       "ethicalCriteriaSelected",
//       JSON.stringify(ethicalCriteria)
//     );
//     navigate("/technical-criteria");
//   };

//   return (
//     <div>
//       <h2>Ethical Criteria</h2>
//       <form>
//         {Object.keys(ethicalCriteria).map(
//           (criterion) =>
//             criterion !== "priorities" && (
//               <div key={criterion}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     name={criterion}
//                     checked={ethicalCriteria[criterion]}
//                     onChange={handleChange}
//                   />
//                   {criterion.replace(/_/g, " ")}
//                 </label>
//                 {[
//                   "security",
//                   "informed_consent",
//                   "transparency",
//                   "user_control",
//                   "equity_non_discrimination",
//                   "dealing_faulty_data",
//                   "anonymization",
//                   "keeping_record",
//                   "minimal_data_collection",
//                   "data_lifecycle_management",
//                 ].includes(criterion) && (
//                   <div>
//                     <label>
//                       Priority:
//                       <select
//                         name={`priority_${criterion}`}
//                         value={ethicalCriteria.priorities[criterion]}
//                         onChange={handleChange}
//                       >
//                         <option value="low">Low</option>
//                         <option value="medium">Medium</option>
//                         <option value="high">High</option>
//                       </select>
//                     </label>
//                   </div>
//                 )}
//               </div>
//             )
//         )}
//         <button type="button" onClick={handleNext}>
//           Next
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EthicalCriteriaPage;
