import './Login.scss';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';


const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");



    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleCreateNewAccount = () => {
        history.push("/register");
    }

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);

        if (!valueLogin) {
            setObjValidInput({ ...objValidInput, isValidValueLogin: false });
            toast.error('Please enter your email address or your phone number');
            return;
        }
        if (!password) {
            setObjValidInput({ ...objValidInput, isValidPassword: false });
            toast.error('Please enter your password');
            return;
        }

        let response = await loginUser(valueLogin, password);
        if (response && response.data && +response.data.EC === 0) {
            let data = {
                isAuthenicated: true,
                token: 'fake token'
            }
            sessionStorage.setItem('account', JSON.stringify(data));

            history.push('/users')
            window.location.reload();
        }

        if (response && response.data && +response.data.EC !== 0) {
            // error
            toast.error(response.data.EM)
        }

    }

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            // Xử lý sự kiện ở đây
            // Hoặc gọi hàm xử lý đăng nhập
            handleLogin();
        }
    }
    return (
        <div className="login-container mt-3">
            <div className="container">
                <div className="row px-3">
                    <div className="container-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            2P
                        </div>
                        <div className='detail'>
                            2P helps you purchase authentic products at competitive prices.
                        </div>

                    </div>
                    <div className="container-right col-12 col-sm-5 gap-3 d-flex flex-column py-3 ">
                        <div className='brand d-sm-none'>
                            2P
                        </div>
                        <input
                            type='text'
                            className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'}
                            placeholder="Email address or phone number"
                            value={valueLogin}
                            onChange={(event) => { setValueLogin(event.target.value) }}
                        />
                        <input
                            type='password'
                            className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                            placeholder="Password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyDown={(event) => handlePressEnter(event)}
                        />
                        <button className="btn btn-primary" onClick={() => handleLogin()}>Login</button>
                        <span className="text-center">
                            <a className='forgot-password' href='#'>Forgot your password?</a>
                        </span>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleCreateNewAccount()}>
                                Create new accout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;