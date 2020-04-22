import React from "react";
import { Button, TextField, RadioGroup, Radio, 
  FormControlLabel, FormLabel, Popover } from '@material-ui/core';
import DaumPostcode from 'react-daum-postcode';
import "../../css/style.css";


const SignUpForm = ({
  onSubmit,
  onChange,
  onAddrChange,
  errors,
  user
}) => {
  // Address Popover
  const [ addrChange, setaddrChange ] = React.useState('');
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  const endAddrChange = (e) => {
    setaddrChange(e.address)
    SignUpForm.onAddrChange = addrChange;
  }

  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = addrChange ? false : (Boolean(anchorEl)===true ? true : false);

  return (
    <div className="loginBox" style={{marginBottom: '70px', transform: 'translate(-50%, 10%)'}}>
      <h1>회원가입</h1>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <div style={{width: '76%', marginLeft: '13%'}}><form onSubmit={onSubmit}>
        <div style={{marginTop: '20px'}}><TextField
          type='input' name='email' label='E-mail' value={user.email} fullWidth='true'
          onChange={onChange} errorText={errors.email}
        /></div>
        <div style={{marginTop: '2px'}}><TextField
          type='password' name='password' label='Password' value={user.password} fullWidth='true'
          onChange={onChange} errorText={errors.password}
        /></div>
        <div style={{marginTop: '2px'}}><TextField
          type='input' name='nickname' label='Nickname' value={user.nickname} fullWidth='true'
          onChange={onChange} errorText={errors.nickname}
        /></div>


        <div style={{marginTop: '2px'}}>
        <TextField
          name='address' label='Address' value={addrChange}
          onChange={onAddrChange} errorText={errors.address} 
        />
        <Button variant="outlined" onClick={handleClick} 
          style={{marginTop: '12px', marginLeft: '4%'}}>
          주소 검색
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onclose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        ><DaumPostcode onComplete={endAddrChange} />
        </Popover>
        </div>

        <div style={{marginTop: '20px'}}>
          <FormLabel component='legend'>gender</FormLabel>
          <RadioGroup aria-label='gender' style={{display: 'block'}}>
            <FormControlLabel value="male" control={<Radio />} label="male" onChange={onChange} />
            <FormControlLabel value="female" control={<Radio />} label="female" onChange={onChange} />
            <FormControlLabel value="other" control={<Radio />} label="other" onChange={onChange} />
          </RadioGroup>
        </div>

        <Button variant="outlined" type="submit" style={{marginTop: '20px'}} color='primary'
        >가입</Button>
      </form></div>

      <p style={{marginTop: '10px'}}>
        이미 계정이 있나요? <a href="/signin">로그인</a>
      </p>
    </div>
  );
};

export default SignUpForm;
