import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <div className="about-page">

      <div className="about-card">

        <div className="profile-section">

          <div className="profile-badge">
            🚀 Full Stack Developer
          </div>

          <img
            src="/dp.jpeg"
            alt="Aradhya Yadav"
            className="profile-image"
          />

          <h1>Aradhya Yadav</h1>

          <h3>
            Full Stack Developer |
            Data Science Enthusiast
          </h3>

          <div className="skills">

            <span>React.js</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>Express.js</span>
            <span>Python</span>
            <span>Machine Learning</span>

          </div>

        </div>

        <div className="about-content">

          <h2>
            👋 About Me
          </h2>

          <p>
            Hello! I'm
            <strong>
              {" "}Aradhya Yadav
            </strong>,
            a B.Tech Computer Science &
            Engineering student at
            Rajkiya Engineering College,
            Kannauj.
          </p>

          <p>
            I am passionate about
            Full Stack Development,
            Data Science, Machine Learning
            and building modern web
            applications that solve
            real-world problems.
          </p>

          <p>
            ShopNest was developed as
            part of my Full Stack
            Development Internship
            Project and demonstrates
            authentication, cart
            management, payment
            integration, order tracking
            and responsive UI design.
          </p>

          <p>
            My technical interests
            include React.js, Node.js,
            MongoDB, Express.js,
            Python, Data Analytics,
            Machine Learning and
            Artificial Intelligence.
          </p>

        </div>

        <div className="stats-section">

          <div className="stat-box">
            <h2>10+</h2>
            <p>Projects</p>
          </div>

          <div className="stat-box">
            <h2>5+</h2>
            <p>Technologies</p>
          </div>

          <div className="stat-box">
            <h2>100%</h2>
            <p>Learning Focus</p>
          </div>

        </div>

        <div className="social-links">

          <a
  href="https://github.com/Aradhya-yadav"
  target="_blank"
  rel="noreferrer"
  className="social-btn github"
>
  💻 GitHub
</a>

         <a
  href="https://www.linkedin.com/in/aradhya-yadav-645910373"
  target="_blank"
  rel="noreferrer"
  className="social-btn linkedin"
>
  💼 Connect on LinkedIn
</a>
          <a
            href="mailto:2308390100015@reck.ac.in"
            className="social-btn email"
          >
             📧 College Email
          </a>

        </div>

      </div>

    </div>
  );
};

export default About;