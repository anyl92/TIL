import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import "./style.css";

const LoginForm = ({ 
  onSubmit,
  onChange,
  errors,
  user,
  type,
  btnState
}) => {
  return (
    <div className="loginBox">
      <h1>로그인</h1>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
      <form onSubmit={onSubmit}>
        <TextField
          name="email"
          floatingLabelText="e-mail"
          value={user.email}
          onChange={onChange}
          errorText={errors.email}
        />
        <TextField
          type={type}
          name="password"
          floatingLabelText="비밀번호"
          value={user.password}
          onChange={onChange}
          errorText={errors.password}
        />

        <div className="pwStrRow"></div>

        <RaisedButton
          className="signUpSubmit"
          primary={true}
          type="submit"
          label="로그인"
          disabled={btnState}
        />
      </form>

      <p>
        <a href="/">회원가입</a>
        <span> | </span>
        <a href="/">비밀번호 찾기</a>
      </p>

      {/* <a href="#"><button>네이버로 로그인</button></a> */}
    </div>
  );
};

export default LoginForm;
