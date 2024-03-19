import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/light-bootstrap-dashboard.css";
import "../assets/css/demo.css";
import axios from "axios";
import Footer from "./Footer";
// SERVICIO LOGIN
import { ApiUrl } from "../services/apiRest";

class Login extends React.Component {
  manejarSubmit(e) {
    e.preventDefault();
  }

  state = {
    form: {
      username: "",
      password: "",
    },
    error: false,
    errorMsg: "Error",
  };

  manejarChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  manejadorButton = () => {
    let url = ApiUrl + "login/validateuser";
    axios
      .post(url, this.state.form)
      .then((response) => {
        if (response.data.message === "User finded ") {
          localStorage.setItem("rol", response.data.rol);
          localStorage.setItem("username", this.state.form.username);
          if (response.data.rol === "admin") {
            window.location = "/Dashboard";
          } else if (response.data.rol === "employee") {
            window.location = "/DashboardEmployee";
          } else if (response.data.rol === "customer") {
            window.location = "/DashBoardCustomer";
          }
          this.setState({
            error: true,
            errorMsg: "Ingresando....",
          });
        } else if (response.data.error === "Error, user is not registered") {
          this.setState({
            error: true,
            errorMsg: "Usuario o Contraseña Invalida",
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMsg: "Invalid user or role.",
        });
      });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row m-5 no-gutters shadow-lg">
            <div className="col-md-6 bg-white p-5">
              <h3 className="pb-3">Login</h3>
              <div className="form-style">
                <form onSubmit={this.manejarSubmit}>
                  <div className="form-group pb-3">
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="username"
                      aria-describedby="emailHelp"
                      onChange={this.manejarChange}
                    />
                  </div>
                  <div className="form-group pb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      name="password"
                      id="exampleInputPassword1"
                      onChange={this.manejarChange}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <a href="#" style={{ color: 'green' }}>Forget Password?</a>
                    </div>
                  </div>

                  {this.state.error === true && (
                    <div className="alert alert-danger" role="alert">
                      {this.state.errorMsg}
                    </div>
                  )}

                  <div className="pb-2">
                    <button
                      type="submit"
                      className="btn btn-dark w-100 font-weight-bold mt-2"
                      onClick={this.manejadorButton}
                    >
                      Ingresar
                    </button>
                  </div>
                </form>

                <div></div>
              </div>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <img
                src="https://images.unsplash.com/photo-1543513960-bd9fe93f4fd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXh0cmVtb3xlbnwwfHwwfHx8MA%3D%3D"
                className="img-fluid"
                style={{ minHeight: "100%" }}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
