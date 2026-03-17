import React from 'react';

const steps = [
  {
    title: 'Started with Basics',
    desc: 'Completed online courses in HTML, CSS, and Java.'
  },
  {
    title: 'Built Small Projects',
    desc: 'Applied knowledge by building small web and Java projects.'
  },
  {
    title: 'Current Focus',
    desc: 'Working on a college matching app and exploring advanced DSA.'
  }
];

const LearningJourney = () => (
  <section id="learning-journey" className="learning-journey-section">
    <h2>Learning Journey</h2>
    <div className="timeline">
      {steps.map((step, idx) => (
        <div className="step" key={idx}>
          <div>
            <strong>{step.title}</strong>
            <div>{step.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default LearningJourney; 