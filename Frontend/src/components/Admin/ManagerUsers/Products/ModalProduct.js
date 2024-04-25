import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { createProduct, updateProduct } from '../../../../services/productService';
import { fetchListProduct } from '../../../../services/productService';
import './Products.scss';


const ModalProduct = (props) => {

    const { action, dataModelProduct } = props;
    const [listProduct, setListProducts] = useState([]);

    useEffect(() => {
        getListProduct();
    }, [dataModelProduct]);

    const getListProduct = async () => {
        let response = await fetchListProduct();
        if (response && +response.EC === 0) {
            setListProducts(response.DT);
        } else {
            return alert('error');
        }
    };

    const defaultProductData = {
        name: '',
        ingredients: '',
        objectOfUse: '',
        price: '',
        img: '',
        quantity: '',
        uses: '',
        preserve: '',
        pack: '',
        origin: '',
        productionSite: '',
        listProductId: '',
    }

    const validInputDefault = {
        name: true,
        ingredients: true,
        objectOfUse: true,
        price: true,
        img: true,
        quantity: true,
        uses: true,
        preserve: true,
        pack: true,
        origin: true,
        productionSite: true,
        listProductId: true,
    }

    const [productData, setProductData] = useState(defaultProductData);
    const [validInput, setValidInput] = useState(validInputDefault);
    const [previewImage, setPreviewImage] = useState('');
    const [getFile, setGetFile] = useState('');

    // let history = useHistory();

    const handleOnchangeInput = (value, name) => {
        let _productData = _.cloneDeep(productData);
        _productData[name] = value;
        setProductData(_productData);
    };

    const checkValidateInput = () => {
        //create new user
        if (action === 'UPDATE') {
            return true;
        }
        setValidInput(validInputDefault);
        let arr = ['name', 'ingredients', 'objectOfUse', 'uses', 'preserve', 'pack', 'origin', 'productionSite', 'price', 'quantity', 'listProductId', 'img'];
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
            let serverData = action === 'CREATE' ? await createProduct(productData) : await updateProduct(productData);
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                setProductData(defaultProductData);
                props.onHide();
                setPreviewImage('');
            }
        }
    };

    const handleCloseModalUser = () => {
        setProductData(defaultProductData);
        setValidInput(validInputDefault);
        setPreviewImage('');
        props.onHide();
    };

    // const getBase64 = async (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader()
    //         reader.readAsDataURL(file)
    //         reader.onload = () => {
    //             resolve(reader.result)
    //         }
    //         reader.onerror = reject
    //     })
    // }

    const handleOnchangeImage = async (event) => {
        try {
            let data = event.target.files;
            let file = data[0];
            if (file) {
                let objectUrl = URL.createObjectURL(file);
                setPreviewImage(objectUrl);
                setGetFile(file);
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        if (action === 'UPDATE') {
            setProductData({ ...dataModelProduct, groupId: dataModelProduct.List_Product ? dataModelProduct.List_Product.id : '' });
        }
    }, [dataModelProduct]);

    return (
        <>
            <Modal size="lg" show={props.isShowModalUser} className='modal-user' onHide={() => handleCloseModalUser()} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{action === 'CREATE' ? 'Thêm mới sản phẩm' : 'Cập nhật sản phẩm'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row '>
                        <div className='col-12 form-group'>
                            <label>Tên sản phẩm: </label>
                            <input
                                className={validInput.name ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.name}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'name')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Thành phần: </label>
                            <input
                                className={validInput.ingredients ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.ingredients}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'ingredients')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Đối tượng sử dụng: </label>
                            <input
                                className={validInput.objectOfUse ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.objectOfUse}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'objectOfUse')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Cách dùng: </label>
                            <input
                                className={validInput.uses ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.uses}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'uses')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Bảo quản: </label>
                            <input
                                className={validInput.preserve ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.preserve}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'preserve')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Đóng gói: </label>
                            <input
                                className={validInput.pack ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.pack}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'pack')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Xuất xứ thương hiệu: </label>
                            <input
                                className={validInput.origin ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.origin}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'origin')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Nơi sản xuất: </label>
                            <input
                                className={validInput.productionSite ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.productionSite}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'productionSite')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Giá: </label>
                            <input
                                className={validInput.price ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.price}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'price')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Số lượng hàng: </label>
                            <input
                                className={validInput.quantity ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.quantity}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'quantity')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Loại sản phẩm:</label>
                            <select
                                className={validInput.listProductId ? 'form-select' : 'form-select is-invalid'}
                                aria-label=""
                                onChange={(event) => handleOnchangeInput(event.target.value, 'listProductId')}
                                value={productData.listProductId}
                            >
                                <option defaultValue value=''>Open this select menu</option>
                                {listProduct.length > 0 &&
                                    listProduct.map((item, index) => {
                                        return (
                                            <option key={`listProduct-${index}`} value={item.id}>{item.categoryName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='form-image'>
                            <form encType="multipart/form-data">
                                <div className=' form-group col-6'>
                                    <label>image:</label>
                                    <input
                                        className={validInput.img ? 'form-control' : 'form-control is-invalid'}
                                        type='file'
                                        name='img'
                                        defaultValue={productData.img}
                                        onChange={(event) => handleOnchangeInput(event.target.files[0], 'img')}
                                        onChangeCapture={(event) => handleOnchangeImage(event)}
                                    />
                                </div>
                                <div className='col-1 check-image'>
                                    <img
                                        src={action === 'UPDATE' && previewImage == '' ? productData.img : previewImage}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmProduct()}>
                        {action === "CREATE" ? "Save" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
};

export default ModalProduct;