import React from "react";
import Footer from "../Footer";
import axios from "axios";
import { Dropdown, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiUrl } from "../../services/apiRest";
class ListEmployee extends React.Component {
  state = {
    data: [],
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

  getLoans = () => {
    let url = ApiUrl + "dashBoard/loansManagement";
    axios.get(url).then((response) => {
      const allLoans = response.data.customers.reduce((acc, customer) => {
        const loans = customer.loans.map((loan) => ({
          id: loan.id,
          isbn: loan.isbn,
          startDate: loan.startDate,
          endDate: loan.endDate,
          state: loan.state,
          _id: loan._id,
          customerUsername: customer.username,
        }));
        return [...acc, ...loans];
      }, []);

      this.setState({ data: allLoans });
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

  sendData = (username, id) => {
    let url =
      ApiUrl + "dashBoard/loansManagement/changeStatus/" + username + "/" + id;
    fetch(url, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Actualizado") {
          this.setState({
            error: true,
            errorMsg: "Actualizado",
          });
          this.getLoans();
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
    this.getLoans();
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
                    src="https://plus.unsplash.com/premium_photo-1661600433546-b87af14cbcc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fERpY2lwbGluYXMlMjBEZXBvcnRpdmFzfGVufDB8fDB8fHww"
                    style={{ height: "200px" }}
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
                        Add Eventos
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
                    <div className="card strpied-tabled-with-hover">
                      <div className="card-header ">
                        <h4 className="card-title">DICIPLINAS</h4>
                      </div>
                      <div className="card-body table-full-width table-responsive">
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th>USUARIO</th>
                              <th>ID</th>
                              <th>FECHA INICIO</th>
                              <th>Fecha fin</th>
                              <th>ESTADO</th>
                              <th>Cambiar estado </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((loans) => (
                              <tr key={loans._id}>
                                <td>{loans.id}</td>
                                <td>{loans.isbn}</td>
                                <td>{this.formatDate(loans.startDate)}</td>
                                <td>{this.formatDate(loans.endDate)}</td>
                                <td>{loans.state ? "Active" : "Inactive"}</td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                      this.sendData(
                                        loans.customerUsername,
                                        loans.id
                                      )
                                    }
                                  >
                                    Cambiar
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
