import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import "./style.css";

const FindPWForm = ({ 
  onSubmit,
  onChange,
  errors,
  user,
  btnState
}) => {
  return (
    <div className="loginBox">
      <h1>비밀번호 찾기</h1>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
      <form onSubmit={onSubmit}>
        <TextField
          name="닉네임"
          floatingLabelText="닉네임"
          value={user.nickname}
          onChange={onChange}
          errorText={errors.nickname}
        />
        <TextField
          name="email"
          floatingLabelText="e-mail"
          value={user.email}
          onChange={onChange}
          errorText={errors.email}
        />
        <p></p>
        <RaisedButton
          className="FindPWSubmit"
          primary={true}
          type="submit"
          label="이메일 발송하기"
          disabled={btnState}
        />
      </form>

      <p></p>
      {/* <p>확인된 이메일 주소로 비밀번호가 발송되었습니다.</p> */}
    </div>
  );
};

export default FindPWForm;
