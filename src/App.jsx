import React, { useEffect, useState } from "react";
import "./App.css";
import profileImage from "./assets/profile-image.jpg";
import headerBackground from "./assets/IMG_1396.jpg";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="container">
      <div className="header">
        <div
          className="background"
          style={{ backgroundImage: `url(${headerBackground})` }}
        ></div>

        <div className="theme-toggle">
          <label className="switch">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <span className="slider"></span>
          </label>
        </div>

        <img src={profileImage} alt="Profile" className="profile-img" />
      </div>

      <div className="header-content">
        <h1>Cody Collins</h1>
        <p>Software Developer</p>
      </div>

      <div className="content">
        <p>
          I'm a junior software developer with a strong passion for clean code,
          thoughtful design, and user-centered experiences. I specialize in
          building responsive and intuitive web applications using technologies
          like Python, HTML, CSS, JavaScript, React, and Vite. With a keen eye
          for detail and a background in UI/UX design and Figma, I strive to
          create seamless digital experiences that merge functionality with
          aesthetics. I'm eager to collaborate, learn, and bring ideas to life.
        </p>
      </div>

      <div className="projects">
        <h2>Projects</h2>
        <div className="project-cards">
          {["1", "2", "3"].map((num) => (
            <div key={num} className="card">
              <div className="card-content">
                <p>Example Project {num}</p>
              </div>
              <a href="https://github.com/CodyC1998" target="_blank">
                <button>View on Github</button>
              </a>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <h3>Get in Touch</h3>
        <p>
          Feel free to connect with me on my social media or through my contact
          details below.
        </p>
        <div className="social-icons">
          <a
            href="https://github.com/CodyC1998"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/cody-collins98"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:cody.collins@keyin.com">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
