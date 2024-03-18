import React from "react";
import axios from "axios";
import Footer from "../Footer";
import { ApiUrl } from "../../services/apiRest";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
class AddBook extends React.Component {
  sendSubmit(e) {
    e.preventDefault();
  }

  state = {
    form: {
      ISBN: "",
      name: "",
      author: "",
      genre: "",
      copies: "",
      publication: "",
      fine: "",
    },
    error: false,
    errorMsg: "Error",
  };
  sendData = () => {
    let url = ApiUrl + "book/createBook";
    axios
      .post(url, this.state.form)
      .then((response) => {


        if (
          response.data.message.toLowerCase() === "Evento registered successfully"
        ) {
          this.setState({
            error: true,
            errorMsg: "Evento registered successfully",
            form: {
              ISBN: "",
              name: "",
              author: "",
              genre: "",
              copies: "",
              publication: "",
              fine: "",
            },
          });
        } else {

          this.setState({
            error: true,
            errorMsg: "Error registering Evento",
          });
        }
      })
      .catch((error) => {

        this.setState({
          error: true,
          errorMsg: "Error",
        });
      });
  };
  manejarChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    const rol = localStorage.getItem("rol");
    return (
      <div>
        <div className="wraper" >
          <div className="sidebar" data-image="../assets/img/sidebar-5.jpg" >
            <div className="sidebar-wrapper" style={{ backgroundColor: '#E11724' }}>
              <div className="logo" >
                <a className="simple-text">
                  <img
                    src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGRlcG9ydGV8ZW58MHx8MHx8fDA%3D"
                    style={{ height: "380px" }}
                    alt="Biblioteca Logo"
                  />
                </a>
              </div>
              <ul className="nav" >
                {rol === "admin" && (
                  <li className="nav-item dropdown" >
                    <Dropdown>
                      <Dropdown.Toggle
                        as={Link}
                        variant="secondary"
                        id="dropdown-books"
                        className="nav-link dropdown-toggle"


                      >
                        <i className="fa-solid fa-book" />
                        <span>Eventos </span>
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

                    <Dropdown>
                      <Dropdown.Toggle
                        as={Link}
                        variant="secondary"
                        id="dropdown-employees"
                        className="nav-link dropdown-toggle"
                      >
                        <i className="fa-solid fa-users" />
                        <span>Admin</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to="/dashBoard/EmployeeManagement"
                        >
                          Admin
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to="/dashBoard/addEmployee">
                          Add Admin
                        </Dropdown.Item>
                      </Dropdown.Menu>
                      <Dropdown.Toggle
                        as={Link}
                        to="/"
                        variant="secondary"
                        id="dropdown-employees"
                        className="nav-link dropdown-toggle"
                      >
                        <i className="fa-solid fa-users" />
                        <span>Inicio</span>
                      </Dropdown.Toggle>
                    </Dropdown>
                  </li>
                )}
                {rol === "employee" && (
                  <ul className="nav">
                    <li className="nav-item dropdown">
                      <Dropdown>
                        <Dropdown.Toggle
                          as={Link}
                          variant="secondary"
                          id="dropdown-basic"
                          className="nav-link dropdown-toggle"
                        >
                          <i className="fa-solid fa-users" />
                          <span>Afiliados</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as={Link}
                            to="/dashBoardEmployee/CustomerManagement"
                          >
                            Afiliados
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            as={Link}
                            to="/dashBoardEmployee/addCustomer"
                          >
                            Add Afiliado
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                    <li className="nav-item dropdown">
                      <Dropdown>
                        <Dropdown.Toggle
                          as={Link}
                          variant="secondary"
                          id="dropdown-basic"
                          className="nav-link dropdown-toggle"
                        >
                          <i className="fa-solid fa-book" />
                          <span>Eventos</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as={Link}
                            to="/dashBoardEmployee/bookManagement"
                          >
                            Eventos
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            as={Link}
                            to="/dashBoardEmployee/createBook"
                          >
                            Add Evento
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>

                    <li className="nav-item dropdown">
                      <Dropdown>
                        <Dropdown.Toggle
                          as={Link}
                          variant="secondary"
                          id="dropdown-basic"
                          className="nav-link dropdown-toggle"
                        >
                          <i className="fa-solid fa-note-sticky" />
                          <span>Diciplinas</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as={Link}
                            to="/dashBoardEmployee/loanManagement"
                          >
                            Diciplinas
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            as={Link}
                            to="/dashBoardEmployee/addLoan"
                          >
                            Add Diciplina
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
                          id="dropdown-basic"
                          className="nav-link dropdown-toggle"
                        >
                          <i className="fa-solid fa-note-sticky" />
                          <span>Inicio</span>
                        </Dropdown.Toggle>
                      </Dropdown>
                    </li>
                  </ul>
                )}
              </ul>
            </div>

          </div>
          <div className="main-panel">

            <nav
              className="navbar navbar-expand-lg"
              color-on-scroll="500"
              data-image="../assets/img/sidebar-5.jpg"
            ></nav>
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title" style={{ color: 'green' }}>AGREGAR VENTO</h4>
                      </div>
                      <div className="card-body">
                        <form onSubmit={this.sendSubmit}>
                          <div class="row">
                            <div class="col-md-4 pr-1">
                              <div class="form-group">
                                <label>ID</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="ID"
                                  name="ISBN"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div class="form-group">
                                <label>NOMBRE</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Nombre"
                                  name="name"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div class="form-group">
                                <label>ENCARGADO</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Encargado"
                                  name="author"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div class="form-group">
                                <label>GENERO</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  name="genre"
                                  placeholder="Genero"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div class="form-group">
                                <label>NUMERO DE PARTICIPANTES</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  name="copies"
                                  placeholder="participnates"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div class="form-group">
                                <label>FECHA DE PUBLICACION</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  placeholder="Username"
                                  name="publication"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div class="form-group">
                                <label>VALOR INSCRIPCION</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="valor"
                                  name="fine"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div class="text-center">
                                <button
                                  type="submit"
                                  class="btn btn-info btn-fill"
                                  onClick={this.sendData}
                                >
                                  AGREGAR
                                </button>
                                <button
                                  type="submit"
                                  class="btn btn-danger btn-fill"
                                >
                                  CANCELAR
                                </button>
                              </div>

                            </div>
                            <a className="simple-text">
                              <img
                                src="https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGRlcG9ydGV8ZW58MHx8MHx8fDA%3D"
                                style={{ height: "800px" }}
                                alt="Biblioteca Logo"
                              />
                            </a>
                          </div>
                          <div class="clearfix"></div>
                        </form>
                        <br></br>
                        {this.state.error === true && (
                          <div className="alert alert-success" role="alert">
                            {this.state.errorMsg}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default AddBook;
