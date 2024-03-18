import React from "react";
import Footer from "../Footer";
import axios from "axios";
import { Dropdown, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiUrl } from "../../services/apiRest";
import { Alert } from "react-bootstrap";
class ListBook extends React.Component {
  state = {
    data: [],
    isModalOpen: false,
    selectedBook: null,
    error: false,
    errorMsg: "Error",
    form: {
      ISBN: "",
      name: "",
      author: "",
      genre: "",
      copies: "",
      publication: "",
      fine: "",
    },
  };

  bookSelected = (book) => {
    this.setState({
      form: {
        id: book._id,
        ISBN: book.ISBN,
        name: book.name,
        author: book.author,
        name: book.name,
        genre: book.genre,
        copies: book.copies,
        publication: book.publication,
        fine: book.fine,
      },
    });
  };
  getBooks = () => {
    let url = ApiUrl + "dashBoard/bookManagement";
    axios.get(url).then((response) => {
      this.setState({ data: response.data.books });
    });
  };

  openModal = (book) => {
    this.bookSelected(book);
    this.setState({
      isModalOpen: true,
      selectedBook: book,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedBook: null,
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
  deleteBook = (isbn) => {
    let url = ApiUrl + "dashBoard/booksManagement/delete/" + isbn;
    axios.delete(url).then((response) => {
      this.setState((prevState) => ({
        data: prevState.data.filter((book) => book.ISBN !== isbn),
        error: true,
        errorMsg: "Evento deleted successfully",
      }));
      setTimeout(() => {
        this.setState({ showAlert: false });
      }, 3000);
      this.getBooks();
    });
  };

  sendData = (e) => {
    e.preventDefault();
    const requestData = {
      _id: this.state.form.id,
      name: this.state.form.name,
      author: this.state.form.author,
      genre: this.state.form.genre,
      copies: this.state.form.copies,
      publication: this.state.form.publication,
      fine: this.state.form.fine,
    };
    let url = ApiUrl + "dashBoard/bookManagement/edit";
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
        if (data.message === "Evento updated successfully") {
          this.setState({
            error: true,
            errorMsg: "Evento updated successfully",
          });
          this.closeModal();
          this.getBooks();
        } else if (data.error === "Error updating evento") {
          this.setState({
            error: true,
            errorMsg: "Error updating evento",
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
    this.getBooks();
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
                    src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGRlcG9ydGV8ZW58MHx8MHx8fDA%3D"
                    style={{ height: "380px" }}
                    alt="Biblioteca Logo"
                  />
                </a>
              </div>

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
              {rol === "admin" && (
                <ul className="nav">
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
                          Admin list
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
                </ul>
              )}
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
                    <div className="card strpied-tabled-with-hover" >
                      <div className="card-header " >
                        <h4 className="card-title" style={{color: 'green'}}>Eventos</h4>
                      </div>
                      <div className="card-body table-full-width table-responsive">
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th style={{color: 'green'}}>ID</th>
                              <th style={{color: 'green'}}>NOMBRE</th>
                              <th style={{color: 'green'}}>ENCARGADO</th>
                              <th style={{color: 'green'}}>GENERO</th>
                              <th style={{color: 'green'}}>NUMERO DE PARTICIPANTES</th>
                              <th style={{color: 'green'}}>FECHA INICIO</th>
                              <th style={{color: 'green'}}>VALOR INSCRIPCION</th>
                              <th style={{color: 'green'}}>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((book) => (
                              <tr key={book._id}>
                                <td>{book.ISBN}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.copies}</td>
                                <td>{this.formatDate(book.publication)}</td>
                                <td>${book.fine}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => this.deleteBook(book._id)}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => this.openModal(book)}
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
                    <ModalHeader closeButton>Editar Evento</ModalHeader>
                    <ModalBody>
                      <div class="card">
                        <div class="card-header">
                          <h4 class="card-title">Edit Evento</h4>
                        </div>
                        <div className="card-body">
                          <form>
                            <input
                              type="hidden"
                              name="_method"
                              defaultValue="PATCH"
                            />
                            <div className="row">
                              <div className="col-md-4 pr-1">
                                <div className="form-group">
                                  <label>Id</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ISBN"
                                    name="ISBN"
                                    id="ISBN1"
                                    readOnly
                                    onChange={this.manejarChange}
                                    defaultValue={form.ISBN}
                                  />
                                </div>
                              </div>
                              <div className="col-md-8 pl-1">
                                <div className="form-group">
                                  <label>Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    onChange={this.manejarChange}
                                    defaultValue={form.name}
                                    id="name1"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-8 pr-1">
                                <div className="form-group">
                                  <label>Encargado</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="author"
                                    id="author1"
                                    onChange={this.manejarChange}
                                    defaultValue={form.author}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-4 pl-1">
                                <div className="form-group">
                                  <label>Genero</label>
                                  <input
                                    id="genre1"
                                    type="text"
                                    className="form-control"
                                    name="genre"
                                    required
                                    onChange={this.manejarChange}
                                    defaultValue={form.genre}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4 pr-1">
                                <div className="form-group">
                                  <label>Numero de participantes</label>
                                  <input
                                    id="copies1"
                                    type="number"
                                    className="form-control"
                                    name="copies"
                                    onChange={this.manejarChange}
                                    defaultValue={form.copies}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-4 pl-1">
                                <div className="form-group">
                                  <label>fecha inicio</label>
                                  <input
                                    id="date1"
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    required
                                    onChange={this.manejarChange}
                                    defaultValue={form.date}
                                  />
                                </div>
                              </div>
                              <div className="col-md-4 pl-1">
                                <div className="form-group">
                                  <label>Fine value</label>
                                  <input
                                    id="fine1"
                                    type="text"
                                    className="form-control"
                                    name="fine"
                                    onChange={this.manejarChange}
                                    defaultValue={form.fine}
                                  />
                                </div>
                              </div>
                              <div
                                className="col-md-4 pl-1"
                                style={{ display: "none" }}
                              >
                                <div className="form-group">
                                  <label>id</label>
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
                                class="btn btn-primary"
                                onClick={this.sendData}
                              >
                                Save changes
                              </button>
                            </div>
                          </form>
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

export default ListBook;
