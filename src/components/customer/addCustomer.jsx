import React from "react";
import Footer from "../Footer";
import { ApiUrl } from "../../services/apiRest";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
class AddCustomer extends React.Component {
  sendSubmit(e) {
    e.preventDefault();
  }

  state = {
    form: {
      name: "",
      lastName: "",
      author: "",
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
      customer: {
        password: this.state.form.password,
        rol: "customer",
        name: this.state.form.name,
        lastName: this.state.form.lastName,
        documentType: this.state.form.documentType,
        documentNumber: this.state.form.documentNumber,
        cellphone: this.state.form.cellphone,
        address: this.state.form.address,
        birthday: this.state.form.birthday,
      },
    };



    const url = ApiUrl + "dashboard/registerCustomer/register";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message.toLowerCase() === "Afiliado registrado") {
          this.setState({
            error: true,
            errorMsg: "registrando Afiliado",
            form: {
              name: "",
              lastName: "",
              author: "",
              documentType: "",
              documentNumber: "",
              birthday: "",
              cellphone: "",
              address: "",
              username: "",
              password: "",
            },
          });
        } else {
          this.setState({
            error: true,
            errorMsg: "registrando Admin",
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
            <div className="sidebar-wrapper"style={{ backgroundColor: '#E11724' }}>
              <div className="logo">
                <a className="simple-text">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1681084014661-8d3450df4311?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3J1cG8lMjBkZXBvcnRpdm9zfGVufDB8fDB8fHww"
                    style={{ height: "360px" }}
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
                        Add Afiliados
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
                        Add Eventos
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>

                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle
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
                      <Dropdown.Item as={Link} to="/dashBoardEmployee/addLoan">
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
                        <h4 className="card-title">AGREGAR AFILIADO</h4>
                      </div>
                      <div className="card-body">
                        <form onSubmit={this.sendSubmit}>
                          <div className="row">
                            <div className="col-md-4 pr-1">
                              <div className="form-group">
                                <label>Primer Nombre</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Primer Nombre"
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
                                  placeholder="Apellido"
                                  name="lastName"
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>tipo de documento</label>
                                <select
                                  className="form-select form-control"
                                  name="documentType"
                                  required="required"
                                  onChange={this.manejarChange}
                                >
                                  <option value="">---Seleccione---</option>
                                  <option value="Citizenship card">
                                    Cedula
                                  </option>
                                  <option value="Foreigner ID">
                                    Pasaporte
                                  </option>
                                  <option value="NIT">NIT</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label>Numero de Documento</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Numero de Documento"
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
                                  placeholder="Telefono"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Direccion</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="address"
                                  placeholder="Direccion"
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
                                  Cancel
                                </button>
                              </div>
                              
                            </div>
                            <a className="simple-text">
                              <img
                                src="https://plus.unsplash.com/premium_photo-1679934839490-e09e4933644b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGdydXBvJTIwZGVwb3J0aXZvc3xlbnwwfHwwfHx8MA%3D%3D"
                                style={{ height: "500px" }}
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

export default AddCustomer;
