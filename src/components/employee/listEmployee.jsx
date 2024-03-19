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
      Name: "",
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
        name: employee.Name,
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
    let url = ApiUrl + "dashBoard/EmployeeManagement";
    axios.get(url).then((response) => {
      this.setState({ data: response.data.employees });
    });
  };

  openModal = (employee) => {
    console.log(employee.birthday);
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
    let url = ApiUrl + "dashboard/employeeManagement/delete/" + id;
    axios
      .delete(url)
      .then((response) => {
        this.setState((prevState) => ({
          data: prevState.data.filter((employee) => employee.id !== id),
          error: true,
          errorMsg: " Eliminado",
        }));

        this.getemployees();
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMsg: "Eliminado ",
        });
      });
  };

  sendData = (e) => {
    e.preventDefault();
    const requestData = {
      email: this.state.form.username,
      employee: {
        name: this.state.form.name,
        lastName: this.state.form.lastName,
        documentType: this.state.form.documentType,
        documentNumber: this.state.form.documentNumber,
        cellphone: this.state.form.cellphone,
        address: this.state.form.address,
        birthday: this.state.form.birthday,
      },
    };
    let url = ApiUrl + "dashboard/employeeManagement/edit";
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
        if (data.message === "Actualizado") {
          this.setState({
            error: true,
            errorMsg: "Actualizaod",
          });
          this.closeModal();
          this.getemployees();
        } else if (data.error === "Actualizado") {
          this.setState({
            error: true,
            errorMsg: "Actualizado ",
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
    return `${year}/${month}/${day}`;
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
                        Add Eventos
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
                    <div className="card strpied-tabled-with-hover">
                      <div className="card-header ">
                        <h4 className="card-title">ADMINISTRADORES</h4>
                      </div>
                      <div className="card-body table-full-width table-responsive">
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th style={{ color: 'green' }}>Usuario</th>
                              <th style={{ color: 'green' }}>nombre</th>
                              <th style={{ color: 'green' }}>Apellido</th>
                              <th style={{ color: 'green' }}>tipo de documento</th>
                              <th style={{ color: 'green' }}>numero de documento</th>
                              <th style={{ color: 'green' }}>Telefono</th>
                              <th style={{ color: 'green' }}>direccion</th>
                              <th style={{ color: 'green' }}>Cumpleaños</th>
                              <th style={{ color: 'green' }}>Acciones</th>
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
                                <td>{this.formatDate(employee.birthday)}</td>

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
                    <ModalHeader closeButton>Editar Administrador</ModalHeader>
                    <ModalBody>
                      <div class="card">
                        <div class="card-header">
                          <h4 class="card-title">Editar Administrador</h4>
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
                                    placeholder="name"
                                    name="name"
                                    defaultValue={form.name}
                                    id="Name"
                                    onChange={this.manejarChange}
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
                                    defaultValue={form.lastName}
                                    id="lastName"
                                    onChange={this.manejarChange}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4 pr-1">
                                <div className="form-group">
                                  <label>Tipo de documento</label>
                                  <select
                                    className="form-select form-control"
                                    id="documentType"
                                    name="documentType"
                                    defaultValue={form.documentType}
                                    onChange={this.manejarChange}
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
                                  <label>Numero de Documento</label>
                                  <input
                                    id="documentNumber"
                                    type="text"
                                    className="form-control"
                                    name="documentNumber"
                                    required
                                    defaultValue={form.documentNumber}
                                    onChange={this.manejarChange}
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
                                    defaultValue={form.cellphone}
                                    onChange={this.manejarChange}
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
                                    required
                                    onChange={this.manejarChange}
                                    defaultValue={this.formatDate(
                                      form.birthday
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={this.closeModal}
                              >
                                Close
                              </button>
                              <button
                                type="submit"
                                class="btn btn-primary"
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
