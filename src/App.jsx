import React, { useEffect, useState } from "react";
import "./App.css";
import profileImage from "./assets/profile-image.jpg";
import headerBackground from "./assets/IMG_1396.jpg";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [repoError, setRepoError] = useState(null);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Fetch GitHub repos
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/CodyC1998/repos");
        if (!res.ok) throw new Error("Failed to load repositories.");
        const data = await res.json();

        const cleaned = data
          .filter((repo) => !repo.fork) // ignore forks
          .sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
          ) // newest updated first
          .slice(0, 6); // show up to 6 featured repos

        setRepos(cleaned);
      } catch (err) {
        setRepoError(err.message);
      } finally {
        setLoadingRepos(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="container">
      {/* Header with background, theme toggle, and profile image */}
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

      {/* Name + Title */}
      <div className="header-content">
        <h1>Cody Collins</h1>
        <p>Software Developer</p>
      </div>

      {/* Bio */}
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

      {/* Projects from GitHub */}
      <div className="projects">
        <h2>Projects</h2>
        <div className="project-cards">
          {loadingRepos && <p>Loading repositories...</p>}

          {repoError && (
            <p className="repo-error">
              Couldn't load GitHub projects right now.
            </p>
          )}

          {!loadingRepos && !repoError && repos.length === 0 && (
            <p>No public repositories found.</p>
          )}

          {!loadingRepos &&
            !repoError &&
            repos.map((repo) => (
              <div key={repo.id} className="card">
                <div className="card-content">
                  <h3>{repo.name}</h3>
                  <p>
                    {repo.description
                      ? repo.description
                      : "No description provided."}
                  </p>
                  {repo.language && (
                    <span className="repo-language">{repo.language}</span>
                  )}
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>View on GitHub</button>
                </a>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
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
        <p>&copy; {new Date().getFullYear()} Cody Collins. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
