import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h2>Ethical Criteria</h2>
      <form>
        {Object.keys(ethicalCriteria).map(
          (criterion) =>
            criterion !== "priorities" && (
              <div key={criterion}>
                <label>
                  <input
                    type="checkbox"
                    name={criterion}
                    checked={ethicalCriteria[criterion]}
                    onChange={handleChange}
                  />
                  {criterion.replace(/_/g, " ")}
                </label>
                {[
                  "security",
                  "informed_consent",
                  "transparency",
                  "user_control",
                  "equity_non_discrimination",
                  "dealing_faulty_data",
                  "anonymization",
                  "keeping_record",
                  "minimal_data_collection",
                  "data_lifecycle_management",
                ].includes(criterion) && (
                  <div>
                    <label>
                      Priority:
                      <select
                        name={`priority_${criterion}`}
                        value={ethicalCriteria.priorities[criterion]}
                        onChange={handleChange}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </label>
                  </div>
                )}
              </div>
            )
        )}
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
};

export default EthicalCriteriaPage;
