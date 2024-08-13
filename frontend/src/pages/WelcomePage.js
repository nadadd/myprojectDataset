import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faChartBar } from '@fortawesome/free-solid-svg-icons';
import '../styles/WelcomePage.css';

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-text">
          <h1 className="title">Get started with D2S_Datasets</h1>
          <p>Welcome to D2S_Datasets! Here's how to get started :</p>
          <ul>
            <li><strong>Step 1: Select your Ethical and Technical criteria.</strong>
              <ul>
                <li><strong>Ethical criteria:</strong>
                Relate to moral principles and standards of good conduct in the collection and use of data. This includes elements such as anonymization of data to protect privacy, informed consent of participants, transparency, security of data to prevent unauthorized access, etc.</li>
                <li><strong>Technical criteria:</strong>
                Refer to the characteristics and specifications used to assess the quality and suitability of datasets for machine learning applications. This includes aspects such as sample balancing, train/test split, and adaptation to different machine learning tasks (classification, prediction, etc.).</li>
              </ul>
            </li>
            All these criteria are defined in our paper <span className="reference-link" onClick={() => document.getElementById('reference1').scrollIntoView()}>[1]</span>.
            <br/>For each criterion you select, assign a priority level to indicate its importance.
            <br/><br/>
            <li><strong>Step 2: Visualizations.</strong>
              <ul>
                <li>Once you have defined your criteria and their priorities, go to the Visualizations section. Here you will find the most relevant datasets, sorted according to the criteria you have selected.</li>
              </ul>
            </li>
          </ul>
          <div id="reference1" className="reference-text">
            [1] T. Khelifi, N. B. Rabah, B. L. Grand. “A Comprehensive Review of Educational Datasets: A Systematic Mapping Study (2022-2023)”, 28th International Conference on Knowledge-Based and Intelligent Information & Engineering Systems (KES 2024).
          </div>
        </div>
        <img src="/images/imagewelcome.png" alt="Welcome" />
      </div>
      <div className="cards">
       
        <Link className='souligne' to="/ethical-criteria">
          <div className="card">
            <span className="icon"><FontAwesomeIcon icon={faCogs} /></span>
            Criteria
          </div>
        </Link>
        <div className="cardvis">
          <span className="icon"><FontAwesomeIcon icon={faChartBar} /></span>
          Visualizations
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
