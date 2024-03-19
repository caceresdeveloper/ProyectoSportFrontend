import React from "react";
import Footer from "../Footer";
import { ApiUrl } from "../../services/apiRest";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
class AddEmployee extends React.Component {
  sendSubmit(e) {
    e.preventDefault();
  }

  state = {
    form: {
      name: "",
      lastName: "",
      documentType: "",
      documentNumber: "",
      birthday: "",
      cellphone: "",
      address: "",
      username: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

  sendData = (e) => {
    e.preventDefault();
    const requestData = {
      email: this.state.form.username,
      employee: {
        password: this.state.form.password,
        rol: "employee",
        name: this.state.form.name,
        lastName: this.state.form.lastName,
        documentType: this.state.form.documentType,
        documentNumber: this.state.form.documentNumber,
        cellphone: this.state.form.cellphone,
        address: this.state.form.address,
        birthday: this.state.form.birthday,
      },
    };

    let url = ApiUrl + "dashboard/registerEmployee/register";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message.toLowerCase() === " registered successfully") {
          this.setState({
            error: true,
            errorMsg: "registrado",
            form: {
              name: "",
              lastName: "",
              documentType: "",
              documentNumber: "",
              birthday: "",
              cellphone: "",
              address: "",
              username: "",
              password: "",
            },
          });
        } else if (data.error === "Error registering ") {
          this.setState({
            error: true,
            errorMsg: "registrando",
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
        <div className="wraper">
          <div className="sidebar" data-image="../assets/img/sidebar-5.jpg">
            <div className="sidebar-wrapper" style={{ backgroundColor: '#E11724' }}>
              <div className="logo">
                <a className="simple-text">
                  <img
                    src="https://images.unsplash.com/photo-1542050532925-05f490df593e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGFkbWluaXN0cmFkb3IlMjBkZXBvcnRpdm98ZW58MHx8MHx8fDA%3D"
                    style={{ height: "380px" }}
                    alt="Biblioteca Logo"
                  />
                </a>
              </div>
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
                      <span>Admin </span>
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
                      <span>Inicio </span>
                    </Dropdown.Toggle>
                  </Dropdown>
                </li>
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
                        <h4 className="card-title">AGREGAR ADMINISTRADOR</h4>
                      </div>
                      <div className="card-body">
                        <form onSubmit={this.sendSubmit}>
                          <div className="row">
                            <div className="col-md-4 pr-1">
                              <div className="form-group">
                                <label>primer nombre </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Primer nombre"
                                  name="name"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Apellido</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="apellido"
                                  name="lastName"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Tipo de Documento</label>
                                <select
                                  className="form-select form-control"
                                  id="documentType"
                                  name="documentType"
                                  required
                                  onChange={this.manejarChange}
                                >
                                  <option value="">--Seleccione--</option>
                                  <option value="Citizenship card">
                                    Cedula
                                  </option>
                                  <option value="Foreigner ID">
                                    pasaporte
                                  </option>
                                  <option value="NIT">NIT</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label>Numero de documento</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Document Number"
                                  name="documentNumber"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Cumpleaños</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="birthday"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Telefono</label>
                                <input
                                  ype="number"
                                  className="form-control"
                                  name="cellphone"
                                  placeholder="Cellphone"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>direccion</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="address"
                                  placeholder="direccion"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Usuario</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Usuario"
                                  name="username"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Contraseña</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Contraseña"
                                  name="password"
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div className="text-center">
                                <button
                                  type="submit"
                                  className="btn btn-info btn-fill"
                                  onClick={this.sendData}
                                >
                                  Agregar
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-danger btn-fill"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                            <a className="simple-text">
                              <img
                                src="https://images.unsplash.com/photo-1617646338887-0bef535ea6a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTgwfHxhZG1pbmlzdHJhZG9yJTIwZGVwb3J0aXZvfGVufDB8fDB8fHww"
                                style={{ height: "600px" }}
                                alt="Biblioteca Logo"
                              />
                            </a>
                          </div>

                          <div className="clearfix"></div>
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

export default AddEmployee;
