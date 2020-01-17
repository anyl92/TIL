import React, { Component } from "react";
import LoginForm from "./LoginForm.js";
const axios = require("axios");
const FormValidators = require("./validate");
const validateLoginForm = FormValidators.validateLoginForm;
const validateOnChangeForm = FormValidators.validateOnChangeForm;


class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: "",
        password: "",
      },
      type: "password",
      btnState: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    event.preventDefault();
    var payload = validateOnChangeForm(this.state.user);
    console.log(payload.btnState)
    if (payload.btnState) {
      this.setState({
        btnState: false,
      })
    } else {
      this.setState({
        btnState: true,
      })
    }

    this.setState({
      user
    });
  }

  submitLogin(user) {
    var params = { username: user.usr, password: user.pw, email: user.email };
    axios
      .post("https://ouramazingserver.com/api/login/submit", params)
      .then(res => {
        if (res.data.success === true) {
          localStorage.token = res.data.token;
          localStorage.isAuthenticated = true;
          window.location.reload();
        } else {
          this.setState({
            errors: { message: res.data.message }
          });
        }
      })
      .catch(err => {
        console.log("Log in data submit error: ", err);
      });
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateLoginForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {}
      });
      var user = {
        usr: this.state.user.username,
        pw: this.state.user.password,
        email: this.state.user.email
      };
      this.submitLogin(user);
    } else {
      const errors = payload.errors;
      // 실패 시 비번 지울 때 쓸것
      // const pwclear = this.state.user.password;
      // console.log(pwclear)
      this.setState({
        errors,
        
      });
    }
  }

  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.validateForm}
          onChange={this.handleChange}
          errors={this.state.errors}
          user={this.state.user}
          type={this.state.type}
          btnState={this.state.btnState}
        />
      </div>
    );
  }
}

export default LoginContainer;
