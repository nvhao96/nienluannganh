import React, { useState, useContext } from 'react';
import './LoginAdmin.scss'
import { NavLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUserAdmin } from '../../../services/userService';
import { UserContext } from '../../../context/adminContext';

const LoginAdmin = (props) => {
    const { loginContext } = useContext(UserContext);

    let history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const defaultObjInput = {
        isValidUsername: true,
        isValidPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultObjInput);

    const handleLogin = async () => {
        setObjCheckInput(defaultObjInput);
        if (!username) {
            toast.error("Vui lòng nhập vào tên đăng nhập");
            setObjCheckInput({ ...defaultObjInput, isValidUsername: false });
            return;
        }
        if (!password) {
            toast.error("Vui lòng nhập vào mật khẩu");
            setObjCheckInput({ ...defaultObjInput, isValidPassword: false });
            return;
        }
        let serverData = await loginUserAdmin(username, password);
        if (+serverData.EC === 0) {

            let email = serverData.DT.email;
            let username = serverData.DT.username;
            let phone = serverData.DT.phone;
            let token = serverData.DT.access_token;
            let data = {
                isAuthenticated: true,
                token,
                account: { username, email, phone }
            }

            loginContext(data);

            history.push("/admin/users");
            window.location.reload();
        } else {
            toast.error(serverData.EM);
        }
    };

    const handlePressEnter = (event) => {
        if (event.keyCode === 13 && event.key === 'Enter') {
            handleLogin();
        }
    };


    return (
        <div className='login-container-admin'>
            <div className='container'>
                <div className='row px-3 px-sm-0 '>
                    <div className='col-3'></div>
                    <div className='col-9 box-login-admin'>
                        <h1>Đăng nhập</h1>

                        <div className='content-admin col-10 col-sm-7 d-flex flex-column gap-3 py-3'>
                            <label><b>Tên đăng nhập</b></label>
                            <input
                                type='text'
                                className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'}
                                placeholder='username'
                                value={username}
                                onChange={(event) => { setUsername(event.target.value) }}
                            />
                            <label><b>Mật khẩu:</b></label>
                            <input
                                type='password'
                                className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Password'
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                                onKeyDown={(event) => handlePressEnter(event)}
                            />
                            <button className='btn btn-primary p-2' onClick={() => handleLogin()}>Đăng nhập</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginAdmin;