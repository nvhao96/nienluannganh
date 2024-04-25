import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { addListProduct, fetchListProduct } from '../../../../services/productService';
import './Products.scss';

const ModalAddListProduct = (props) => {

    const [listProduct, setListProducts] = useState([]);

    useEffect(() => {
        getListProduct();
    }, []);

    const getListProduct = async () => {
        let response = await fetchListProduct();
        console.log(response);
        if (response && +response.EC === 0) {
            setListProducts(response.DT);
        } else {
            return alert('error');
        }
    };

    const defaultProductData = {
        categoryName: '',
        description: '',
    }

    const validInputDefault = {
        categoryName: true,
        description: true,
    }

    const [productData, setProductData] = useState(defaultProductData);
    const [validInput, setValidInput] = useState(validInputDefault);
    // let history = useHistory();

    const handleOnchangeInput = (value, name) => {
        let _productData = _.cloneDeep(productData);
        _productData[name] = value;
        setProductData(_productData);
    };

    const checkValidateInput = () => {
        //create new user
        setValidInput(validInputDefault);
        let arr = ['categoryName', 'description'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!productData[arr[i]]) {
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

    const handleConfirmProduct = async () => {
        // create user
        let check = checkValidateInput();
        if (check === true) {
            let serverData = await addListProduct(productData);
            console.log(serverData);
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                setProductData(defaultProductData);
                props.onHide();
            }
        }
    };

    const handleCloseModalUser = () => {
        props.onHide();
        setProductData(defaultProductData);
        setValidInput(validInputDefault);
    };

    return (
        <>
            <Modal size="lg" show={props.isShowModalAddListProduct} className='modal-user' onHide={() => handleCloseModalUser()} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>Thêm loại sản phẩm mới</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row '>
                        <div className='col-12 form-group'>
                            <label>Tên loại sản phẩm: </label>
                            <input
                                className={validInput.categoryName ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.categoryName}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'categoryName')}
                                placeholder='VD: TPCN + tên loại hoặc nhóm'
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Mô tả của loại sản phẩm: </label>
                            <input
                                className={validInput.description ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.description}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'description')}
                            />
                        </div>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmProduct()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
};

export default ModalAddListProduct;