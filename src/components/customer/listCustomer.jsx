import React from "react";
import Footer from "../Footer";
import axios from "axios";
import { Dropdown, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiUrl } from "../../services/apiRest";
class ListEmployee extends React.Component {
  state = {
    data: [],
    isModalOpen: false,
    selectedemployee: null,
    error: false,
    errorMsg: "Error",
    form: {
      id: "",
      username: "",
      password: "",
      rol: "",
      name: "",
      lastName: "",
      documentType: "",
      documentNumber: "",
      cellphone: "",
      address: "",
      birthday: "",
    },
  };

  employeeSelected = (employee) => {
    this.setState({
      form: {
        id: employee._id,
        username: employee.username,
        password: employee.password,
        rol: employee.rol,
        name: employee.name,
        lastName: employee.lastName,
        documentType: employee.documentType,
        documentNumber: employee.documentNumber,
        cellphone: employee.cellphone,
        address: employee.address,
        birthday: employee.birthday,
      },
    });
  };
  getemployees = () => {
    let url = ApiUrl + "dashBoard/customersManagement";
    axios.get(url).then((response) => {
      this.setState({ data: response.data.customers });
    });
  };

  openModal = (employee) => {
    this.setState({
      isModalOpen: true,
      selectedemployee: employee,
      form: {
        id: employee._id,
        username: employee.username,
        password: employee.password,
        rol: employee.rol,
        name: employee.name,
        lastName: employee.lastName,
        documentType: employee.documentType,
        documentNumber: employee.documentNumber,
        cellphone: employee.cellphone,
        address: employee.address,
        birthday: employee.birthday,
      },
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedemployee: null,
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
  deleteEmployee = (id) => {
    let url = ApiUrl + "dashboard/customersManagement/delete/" + id;
    axios
      .delete(url)
      .then((response) => {
        this.setState((prevState) => ({
          data: prevState.data.filter((employee) => employee.id !== id),
          error: true,
          errorMsg: "Eliminando",
        }));

        this.getemployees();
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMsg: "Eliminando ",
        });
      });
  };

  sendData = (e) => {
    e.preventDefault();
    const requestData = {
      email: this.state.form.username,
      customer: {
        name: this.state.form.name,
        lastName: this.state.form.lastName,
        documentType: this.state.form.documentType,
        documentNumber: this.state.form.documentNumber,
        cellphone: this.state.form.cellphone,
        address: this.state.form.address,
        birthday: this.state.form.birthday,
      },
    };
    let url = ApiUrl + "dashboard/customersManagement/edit";
    fetch(url, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === " Actualizado") {
          this.setState({
            error: true,
            errorMsg: " Actualizado",
          });
          this.closeModal();
          this.getemployees();
        } else if (data.error === "Error Actualizando ") {
          this.setState({
            error: true,
            errorMsg: "Error Actualizando ",
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

  componentDidMount() {
    this.getemployees();
  }

  formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  render() {
    const { data, isModalOpen, form } = this.state;

    const rol = localStorage.getItem("rol");

    return (
      <div>
        <div className="wrapper">
          <div className="sidebar" data-image="../assets/img/sidebar-5.jpg">
            <div className="sidebar-wrapper" style={{ backgroundColor: '#E11724' }}>
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
                      <span>AFILIADOS</span>
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
                        Add Diciplinas
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
                    <div className="card strpied-tabled-with-hover">
                      <div className="card-header ">
                        <h4 className="card-title">AFILIADOS</h4>
                      </div>
                      <div className="card-body table-full-width table-responsive">
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th style={{color: 'green'}}>Usuario</th>
                              <th style={{color: 'green'}}>Nombre</th>
                              <th style={{color: 'green'}}>Apellido</th>
                              <th style={{color: 'green'}}>Tipo de Documento</th>
                              <th style={{color: 'green'}}>Numero de documento</th>
                              <th style={{color: 'green'}}>Telefono</th>
                              <th style={{color: 'green'}}>Direccion</th>
                              <th style={{color: 'green'}}>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((employee) => (
                              <tr key={employee._id}>
                                <td>{employee.username}</td>
                                <td>{employee.name}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.documentType}</td>
                                <td>{employee.documentNumber}</td>
                                <td>{employee.cellphone}</td>
                                <td>{employee.address}</td>

                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      this.deleteEmployee(employee._id)
                                    }
                                  >
                                    Delete
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => this.openModal(employee)}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {this.state.error === true && (
                      <div className="alert alert-danger" role="alert">
                        {this.state.errorMsg}
                      </div>
                    )}
                  </div>
                  {/*END TABLE*/}
                  <Modal show={isModalOpen} onHide={this.closeModal}>
                    <ModalHeader closeButton>Edit Afiliado</ModalHeader>
                    <ModalBody>
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title">Edit Afiliado</h4>
                        </div>
                        <div className="card-body">
                          <form>
                            <input
                              type="hidden"
                              name="_method"
                              defaultValue="PATCH"
                            />
                            <div className="row">
                              <div className="col-md-6 pr-1">
                                <div className="form-group">
                                  <label>Nombre</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    onChange={this.manejarChange}
                                    defaultValue={form.name}
                                    id="Name"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 pl-1">
                                <div className="form-group">
                                  <label>Apellido</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    onChange={this.manejarChange}
                                    defaultValue={form.lastName}
                                    id="lastName"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4 pr-1">
                                <div className="form-group">
                                  <label>Tipo de Documento</label>
                                  <select
                                    className="form-select form-control"
                                    id="documentType"
                                    name="documentType"
                                    onChange={this.manejarChange}
                                    defaultValue={form.documentType}
                                  >
                                    <option value="Citizenship card">
                                      Cedula
                                    </option>
                                    <option value="Foreigner ID">
                                      pasaporte
                                    </option>
                                    <option value="NIT">NIT</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-4 pl-1">
                                <div className="form-group">
                                  <label>Numero de documento</label>
                                  <input
                                    id="documentNumber"
                                    type="text"
                                    className="form-control"
                                    name="documentNumber"
                                    required
                                    onChange={this.manejarChange}
                                    defaultValue={form.documentNumber}
                                  />
                                </div>
                              </div>
                              <div className="col-md-4 pl-1">
                                <div className="form-group">
                                  <label>Telefono</label>
                                  <input
                                    id="cellphone"
                                    type="text"
                                    className="form-control"
                                    name="cellphone"
                                    required
                                    onChange={this.manejarChange}
                                    defaultValue={form.cellphone}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6 pr-1">
                                <div className="form-group">
                                  <label>Direccion</label>
                                  <input
                                    id="address"
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    onChange={this.manejarChange}
                                    defaultValue={form.address}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 pl-1">
                                <div className="form-group">
                                  <label>Usuario</label>
                                  <input
                                    id="username"
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    required
                                    disabled
                                    onChange={this.manejarChange}
                                    defaultValue={form.username}
                                  />
                                </div>
                              </div>

                              <div
                                className="col-md-4 pl-1"
                                style={{ display: "none" }}
                              >
                                <div className="form-group">
                                  <label>Id</label>
                                  <input
                                    id="id"
                                    type="text"
                                    className="form-control"
                                    name="id"
                                    onChange={this.manejarChange}
                                    defaultValue={form.id}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4 pl-1">
                                <div className="form-group">
                                  <label>Cumpleaños</label>
                                  <input
                                    id="birthday"
                                    type="date"
                                    className="form-control"
                                    name="birthday"
                                    onChange={this.manejarChange}
                                    defaultValue={form.birthday}
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={this.closeModal}
                              >
                                Close
                              </button>
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.sendData}
                              >
                                Save changes
                              </button>
                            </div>
                          </form>
                          <br></br>
                          {this.state.error === true && (
                            <div className="alert alert-success" role="alert">
                              {this.state.errorMsg}
                            </div>
                          )}
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
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

export default ListEmployee;
