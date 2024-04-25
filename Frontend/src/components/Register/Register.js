import React, { useEffect, useState } from 'react';
import './Register.scss'
import { NavLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerNewuser } from '../../services/userService';

const Register = (props) => {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const defaulValidInput = {
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
        isValidPhone: true,
        isValidEmail: true,
        isValidAddress: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaulValidInput);

    useEffect(() => {
        // axios.get('http://localhost:8888/api/testApi').then(data => {
        //     console.log("check data from frontend: ", data);
        // })
    }, []);

    let history = useHistory();

    const isValidateInputs = () => {
        setObjCheckInput(defaulValidInput)
        if (!username) {
            toast.error("Vui lòng nhập vào tên đăng nhập");
            setObjCheckInput({ ...defaulValidInput, isValidUsername: false });
            return false;
        }
        if (!password) {
            toast.error("Vui lòng nhập vào mật khẩu");
            setObjCheckInput({ ...defaulValidInput, isValidPassword: false });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Nhập lại mật khẩu chưa chính xác");
            setObjCheckInput({ ...defaulValidInput, isValidConfirmPassword: false });
            return false;
        }
        if (!phone) {
            toast.error("Vui lòng nhập vào số điện thoại");
            setObjCheckInput({ ...defaulValidInput, isValidPhone: false });
            return false;
        }
        if (!email) {
            toast.error("Vui lòng nhập vào email hợp lệ");
            setObjCheckInput({ ...defaulValidInput, isValidEmail: false });
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Địa chỉ email không hợp lệ");
            setObjCheckInput({ ...defaulValidInput, isValidEmail: false });
            return false;
        }
        if (!address) {
            toast.error("Vui lòng nhập vào địa chỉ");
            setObjCheckInput({ ...defaulValidInput, isValidAddress: false });
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        let check = isValidateInputs();
        if (check === true) {
            let serverData = await registerNewuser(username, password, phone, email, address);
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                history.push("/login");
            }
            else {
                let data = serverData.DT;
                if (data === 'isValidUsername') {
                    setObjCheckInput({ ...defaulValidInput, isValidUsername: false });
                }
                if (data === 'isValidPassword') {
                    setObjCheckInput({ ...defaulValidInput, isValidPassword: false });
                }
                if (data === 'isValidPhone') {
                    setObjCheckInput({ ...defaulValidInput, isValidPhone: false });
                }
                if (data === 'isValidEmail') {
                    setObjCheckInput({ ...defaulValidInput, isValidEmail: false });
                }
                toast.error(serverData.EM);
            }
        }
    };

    return (
        <div className='register-container'>
            <div className='container'>
                <div className='row px-3 px-sm-0 '>
                    <div className='col-3'></div>
                    <div className='col-9 box-register'>
                        <h1>Đăng ký</h1>

                        <div className='content col-10 col-sm-7 d-flex flex-column gap-3 py-3'>
                            <div className='form-group'>
                                <label><b>Tên đăng nhập</b></label>
                                <input type='text' className={objCheckInput.isValidUsername ? 'form-control mt-1' : 'form-control mt-1 is-invalid'} placeholder='Nhập vào tên đăng nhập'
                                    value={username} onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label><b>Mật khẩu:</b></label>
                                <input type='password' className={objCheckInput.isValidPassword ? 'form-control mt-1' : 'form-control mt-1 is-invalid'} placeholder='Nhập vào mật khẩu'
                                    value={password} onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label><b>Nhập lại mật khẩu:</b></label>
                                <input type='password' className={objCheckInput.isValidConfirmPassword ? 'form-control mt-1' : 'form-control mt-1 is-invalid'} placeholder='Nhập lại mật khẩu'
                                    value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label><b>Số điện thoại:</b></label>
                                <input type='phone' className={objCheckInput.isValidPhone ? 'form-control mt-1' : 'form-control mt-1 is-invalid'} placeholder='Nhập vào số điện thoại'
                                    value={phone} onChange={(event) => setPhone(event.target.value)}
                                />
                            </div> <div className='form-group'>
                                <label><b>email:</b></label>
                                <input type='email' className={objCheckInput.isValidEmail ? 'form-control mt-1' : 'form-control mt-1 is-invalid'} placeholder='Nhập vào địa chỉ email'
                                    value={email} onChange={(event) => setEmail(event.target.value)}
                                />
                            </div> <div className='form-group'>
                                <label><b>Địa chỉ</b></label>
                                <input type='address' className={objCheckInput.isValidAddress ? 'form-control mt-1' : 'form-control mt-1 is-invalid'} placeholder='Nhập vào địa chỉ nhà'
                                    value={address} onChange={(event) => setAddress(event.target.value)}
                                />
                            </div>
                            <button className='btn btn-success' onClick={() => handleRegister()}>Đăng ký</button>
                            <span className='text-center'><NavLink to='/login'>Đăng nhập ngay.</NavLink></span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;