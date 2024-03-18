import React from "react";
import Footer from "../Footer";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/light-bootstrap-dashboard.css";
import "../../assets/css/demo.css";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  render() {
    const rol = localStorage.getItem("rol");
    return (
      <div>
        <div style={{ backgroundColor: '#E11724', color: 'white', fontSize: '50px', padding: '20px' }}>SportFIT</div>
        <div>
          <ul className="nav">
            <li className="nav-item dropdown">
              <Dropdown>
                <Dropdown.Toggle
                  as={Link}
                  variant="secondary"
                  id="dropdown-employees"
                  className="nav-link dropdown-toggle"
                >
                  <i className="fa-solid fa-users" />
                  <span style={{ color: 'black' }}>Admin </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to="/dashBoard/employeeManagement"
                  >
                    Admin
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/dashBoard/addEmployee">
                    Add Admin
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item dropdown">
              <Dropdown>
                <Dropdown.Toggle
                  as={Link}
                  variant="secondary"
                  id="dropdown-books"
                  className="nav-link dropdown-toggle"
                >
                  <i className="fa-solid fa-book" />
                  <span style={{ color: 'black' }}>Eventos </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/dashBoard/bookManagement">
                    Eventos
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/dashBoard/createBook">
                    Add Evento
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li className="nav-item dropdown">
              <Dropdown>
                <Dropdown.Toggle
                  as={Link}
                  to="/"
                  variant="secondary"
                  id="dropdown-books"
                  className="nav-link dropdown-toggle"
                >
                  <i className="fa-solid fa-book" />
                  <span style={{ color: 'black' }}>Inicio</span>
                </Dropdown.Toggle>
              </Dropdown>
            </li>
          </ul>
        </div>

        <div>
          <div className="about-container">
            <h2>Nosotros</h2>
            <div class="container">
              <p>
                Bienvenido a nuestra página deportiva! En nuestro sitio web, nos complace presentarte una amplia gama de servicios y oportunidades relacionadas con el apasionante mundo del deporte. Somos tu destino definitivo para todas tus necesidades deportivas, desde el préstamo de implementos hasta la organización de eventos y actividades recreativas.

                Nuestro objetivo principal es proporcionarte la oportunidad de disfrutar plenamente de tus actividades deportivas favoritas sin tener que preocuparte por el equipo necesario. Con nuestro servicio de préstamo de implementos deportivos, te ofrecemos acceso conveniente a una extensa variedad de equipos para una amplia gama de deportes, incluyendo tenis, fútbol, baloncesto, natación, y muchos más. Ya seas un atleta experimentado o un aficionado entusiasta, estamos aquí para asegurarnos de que tengas todo lo que necesitas para desempeñarte al máximo en tu deporte elegido
              </p>
            </div>
            <div class="container">
              <p>
                Pero eso no es todo. Además de nuestro servicio de préstamo de implementos, también nos dedicamos a organizar una gran variedad de eventos deportivos y actividades recreativas diseñadas para fomentar la participación y el disfrute en la comunidad deportiva. Desde emocionantes torneos y competiciones hasta clases y sesiones de entrenamiento dirigidas por profesionales, ofrecemos oportunidades emocionantes para que personas de todas las edades y niveles de habilidad se involucren en el mundo del deporte y se diviertan mientras mejoran su salud y bienestar.

                Nos enorgullece ofrecer un servicio excepcional y crear experiencias deportivas inolvidables para nuestros usuarios. Nuestro equipo está compuesto por apasionados del deporte que están comprometidos a ayudarte en cada paso del camino. Ya sea que estés buscando el equipo perfecto, planificando un evento deportivo especial o simplemente buscando un lugar para disfrutar del deporte con amigos y familiares, estamos aquí para hacer que tu experiencia sea lo más placentera y satisfactoria posible.
              </p>
            </div>
            <div className="sidebar-wrapper" style={{ backgroundColor: '#E11724', display: 'flex' }}>
              <a className="simple-text" style={{ display: 'block' }}>
                <img
                  src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGRlcG9ydGV8ZW58MHx8MHx8fDA%3D"
                  style={{ height: "300px", width: "auto" }}
                  alt="Imagen de implementos deportivos"
                />
              </a>
              <a className="simple-text" style={{ display: 'block' }}>
                <img
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVwb3J0ZXN8ZW58MHx8MHx8fDA%3D"
                  style={{ height: "300px", width: "auto" }}
                  alt="Imagen de implementos deportivos"
                />
              </a>
              <a className="simple-text" style={{ display: 'block' }}>
                <img
                  src="https://images.unsplash.com/photo-1444491741275-3747c53c99b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGRlcG9ydGVzfGVufDB8fDB8fHww"
                  style={{ height: "300px", width: "auto" }}
                  alt="Imagen de implementos deportivos"
                />
              </a>
              <a className="simple-text" style={{ display: 'block' }}>
                <img
                  src="https://images.unsplash.com/photo-1565992441121-4367c2967103?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGRlcG9ydGVzfGVufDB8fDB8fHww"
                  style={{ height: "300px", width: "auto" }}
                  alt="Imagen de implementos deportivos"
                />
              </a>
              <a className="simple-text" style={{ display: 'block' }}>
                <img
                  src="https://plus.unsplash.com/premium_photo-1685118419397-c8ed456734ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGRlcG9ydGVzfGVufDB8fDB8fHww"
                  style={{ height: "300px", width: "auto" }}
                  alt="Imagen de implementos deportivos"
                />
              </a>
              <a className="simple-text" style={{ display: 'block' }}>
                <img
                  src="https://images.unsplash.com/photo-1509027572446-af8401acfdc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGRlcG9ydGVzfGVufDB8fDB8fHww"
                  style={{ height: "300px", width: "auto" }}
                  alt="Imagen de implementos deportivos"
                />
              </a>
              <a className="simple-text" style={{ display: 'block' }}>
                <img
                  src="https://images.unsplash.com/photo-1610768764270-790fbec18178?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGRlcG9ydGVzfGVufDB8fDB8fHww"
                  style={{ height: "300px", width: "auto" }}
                  alt="Imagen de implementos deportivos"
                />
              </a>
              <a className="simple-text" style={{ display: 'block' }}>
                <img
                  src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGRlcG9ydGVzfGVufDB8fDB8fHww"
                  style={{ height: "300px", width: "auto" }}
                  alt="Imagen de implementos deportivos"
                />
              </a>
              <a className="simple-text" style={{ display: 'block' }}>
                <img
                  src="https://plus.unsplash.com/premium_photo-1684870015203-1800354e4774?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGRlcG9ydGVzfGVufDB8fDB8fHww"
                  style={{ height: "300px", width: "auto" }}
                  alt="Imagen de implementos deportivos"
                />
              </a>
            </div>
          </div>
          <nav
            className="navbar navbar-expand-lg"
            color-on-scroll="500"
            data-image="../assets/img/sidebar-5.jpg"
          >
            <div className="container-fluid">
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navigation"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown">
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <a className="dropdown-item" href="#">
                        Update data
                      </a>
                      <div className="divider" />
                      <a className="dropdown-item" href="/">
                        Log out
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="content"></div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
