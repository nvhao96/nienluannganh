import './Register.scss';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }

    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);


    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }

    useEffect(() => {
        // axios.get("http://localhost:8080/api/v1/test-api").then(data => {
        //     console.log(">>> check data axios: ", data);
        // })
    }, []);

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);

        if (!email) {
            toast.error("Email is not empty");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Please enter a valid email address");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!phone) {
            toast.error("Phone is not empty");
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        // if (!username) {
        //     toast.error("Username not empty");
        //     return false;
        // }
        if (!password) {
            toast.error("Password is not empty");
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password is not the same ");
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        }

        return true;
    }

    const handleRegister = async () => {

        let check = isValidInputs();

        if (check === true) {
            let response = await registerNewUser(email, phone, username, password);
            let serverData = response.data;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                history.push("/login");
            } else {
                toast.error(serverData.EM);
            }
        }

        // let userData = { email, phone, username, password };
        // console.log(">> check userdata: ", userData);

    }

    return (
        <div className="register-container mt-3">
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
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type='text' className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-valid'} placeholder="Email address"
                                value={email} onChange={(envent) => setEmail(envent.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone Number:</label>
                            <input type='text' className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-valid'} placeholder="Phone number"
                                value={phone} onChange={(envent) => setPhone(envent.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type='text' className="form-control" placeholder="Username"
                                value={username} onChange={(envent) => setUsername(envent.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type='password' className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-valid'} placeholder="Password"
                                value={password} onChange={(envent) => setPassword(envent.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input type='password' className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-valid'} placeholder="Re-enter password"
                                value={confirmPassword} onChange={(envent) => setConfirmPassword(envent.target.value)} />
                        </div>

                        <button className="btn btn-primary" onClick={() => handleRegister()}>Register</button>

                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleLogin()}>
                                Already've an account. Login
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;