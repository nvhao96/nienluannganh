import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { createUser, updateUser } from '../../../../services/userService'

const ModalUser = (props) => {

    const { action, dataModelUser } = props;

    const defaultUserData = {
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        groupId: '',
    }

    const validInputDefault = {
        username: true,
        email: true,
        password: true,
        phone: true,
        address: true,
        groupId: true,
    }

    const [userData, setUserData] = useState(defaultUserData);
    const [validInput, setValidInput] = useState(validInputDefault);

    let history = useHistory();

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    };

    const checkValidateInput = () => {
        //create new user
        if (action === 'UPDATE') {
            return true;
        }
        setValidInput(validInputDefault);
        let arr = ['username', 'email', 'password', 'phone', 'address', 'groupId'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInput = _.cloneDeep(validInputDefault);
                _validInput[arr[i]] = false;

                setValidInput(_validInput);

                toast.error(`empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }

    const handleConfirmUser = async () => {

        // create user
        let check = checkValidateInput();
        if (check === true) {
            let serverData = action === 'CREATE' ? await createUser(userData) : await updateUser(userData);
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                setUserData(defaultUserData);
                props.onHide();
            }
            else {
                let data = serverData.DT;
                if (data === 'username') {
                    setValidInput({ ...validInputDefault, username: false });
                }
                if (data === 'password') {
                    setValidInput({ ...validInputDefault, password: false });
                }
                if (data === 'phone') {
                    setValidInput({ ...validInputDefault, phone: false });
                }
                if (data === 'email') {
                    setValidInput({ ...validInputDefault, email: false });
                }
                toast.error(serverData.EM);
            }
        }
    };

    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setValidInput(validInputDefault);
    };

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModelUser, groupId: dataModelUser.Group ? dataModelUser.Group.id : '' });
        }
    }, [dataModelUser]);

    return (
        <>
            <Modal size="lg" show={props.isShowModalUser} className='modal-user' onHide={() => handleCloseModalUser()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{action === 'CREATE' ? 'Create a new user' : 'Update user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row '>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username: </label>
                            <input
                                className={validInput.username ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.username}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'username')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email address: </label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInput.email ? 'form-control' : 'form-control is-invalid'}
                                type='email'
                                value={userData.email}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'email')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            {action === 'CREATE'
                                &&
                                <>
                                    <label>Password: </label>
                                    <input
                                        className={validInput.password ? 'form-control' : 'form-control is-invalid'}
                                        type='password'
                                        value={userData.password}
                                        onChange={(event) => handleOnchangeInput(event.target.value, 'password')}
                                    />
                                </>
                            }
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number: </label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInput.phone ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.phone}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'phone')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Address: </label>
                            <input
                                className={validInput.address ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.address}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'address')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Name group:</label>
                            <select
                                className={validInput.groupId ? 'form-select' : 'form-select is-invalid'}
                                aria-label=""
                                onChange={(event) => handleOnchangeInput(event.target.value, 'groupId')}
                                disabled={action === 'CREATE' ? false : true}
                                value={userData.groupId}
                            >
                                <option defaultValue value=''>Open this select menu</option>
                                <option value="1">Customer</option>
                                <option value="2">Admin</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === "CREATE" ? "Save" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default ModalUser;