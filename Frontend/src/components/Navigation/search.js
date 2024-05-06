import { useEffect, useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

import { fetAllProductHomePage } from '../../services/productService';
function SearchProduct() {
    const [listProducts, setListProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(12);


    const data = listProducts?.map((product) => {
        return {
            value: product.name, label: (
                <Link to={{

                    pathname: `/product/${product.name}/${product.id}`,
                }}>

                    <div className="product-option flex" >
                        <div className="product-option-image flex">
                            <img
                                src={product.img}
                                alt=""
                                className=""
                                style={{ width: "100px" }}
                            />
                        </div>
                        <div className="product-option-label">
                            <p >{product.name}</p>
                        </div>
                    </div>
                </Link>

            ),
        }
    })
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: "25px",
            borderColor: state.isFocused ? "#000" : "#ccc",
            boxShadow: state.isFocused ? "0 0 0 1px #000" : null,
            "&:hover": {
                borderColor: state.isFocused ? "#000" : "#ccc"
            }
        }),
        option: (provided) => ({
            ...provided,
            textAlign: "left",
        }),
    };

    const fetchProducts = async () => {
        let response = await fetAllProductHomePage(currentPage, currentLimit);
        // setSelectedOptions(response)
        if (response && response.EC === 0) {
            // setTotalPages(response.DT.totalPages);
            setListProducts(response.DT.products);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, [currentPage]);
    return (<div>
        <Select
            options={data}
            styles={customStyles}
            value={listProducts}
            placeholder="Tìm kiếm sản phẩm"
        />
    </div>);
}

export default SearchProduct;