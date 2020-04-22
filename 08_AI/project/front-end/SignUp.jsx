import React, { Component } from "react";
import SignUpForm from "./SignUpForm";
import Zoom from '@material-ui/core/Zoom';

const axios = require("axios");
const validateSignUpForm = require("./validate").validateSignUpForm;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        nickname: "",
        email: "",
        password: "",
        address:"",
        gender:""
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  handleAddress(data) {
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    
    console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    const user = this.state.user;
    user["address"] = fullAddress;
    this.setState({
      user
    });
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  submitSignup(user) {
    var params = { nickname: user.nick, password: user.pw, email: user.email, address: user.address, gender: user.gender, type:0};
    console.log(params);
    axios
      .post("http://localhost:7888/signup2/", params)
      .then(res => {
        if (res.data.success === true) {
          localStorage.token = res.data.token;
          localStorage.isAuthenticated = true;
          window.location.href = '/';
          alert('회원가입 성공!')
        } else {
          this.setState({
            errors: { message: res.data.message }
          });
        }
      })
      .catch(err => {
        console.log("Sign up data submit error: ", err);
      });
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {}
      });
      var user = {
        nick: this.state.user.nickname,
        pw: this.state.user.password,
        email: this.state.user.email,
        address: this.state.user.address,
        gender: this.state.user.gender
      };
      this.submitSignup(user);
    } else {
      const errors = payload.errors;
      this.setState({
        errors
      });
    }
  }

  render() {
    return (
      <div>
        <Zoom in={true}>
          <SignUpForm
            onSubmit={this.validateForm}
            onChange={this.handleChange}
            onAddrChange={this.handleAddress}
            errors={this.state.errors}
            user={this.state.user}
          />
        </Zoom>
      </div>
    );
  }
}

export default SignUp;
