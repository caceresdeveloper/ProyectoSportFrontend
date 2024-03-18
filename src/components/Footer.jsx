import React from "react";
class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="container-fluid">
            <nav>
              <ul className="footer-menu">
                <li>
                  <a href="https://www.linkedin.com/in/diego-fernando-c%C3%A1ceres-90998b212/">Diego Caceres</a>
                </li>
                <li>
                  <a href="https://github.com/Ronaldo-perezd">Ronaldo Diaz</a>
                </li>
                <li>
                  <a href="https://www.uptc.edu.co/sitio/portal/">Universidad Pedagogica y tecnologica de Colombia</a>
                </li>
              </ul>
              <p className="copyright text-center">
                ©<a>Made with Express and EJS</a>
              </p>
            </nav>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
