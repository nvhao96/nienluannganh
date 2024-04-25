import './footer.scss';
import { NavLink, useHistory } from 'react-router-dom';

const Footer = (props) => {
    return (
        <>
            <div className="footer-container">
                <div className='top-footer'></div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-3 box-footer'>
                            <h5 className='text-center'>Về chúng tôi</h5>
                            <NavLink to="/about">Giới thiệu</NavLink>
                            <NavLink to="/">Chính sách bảo mật</NavLink>
                            <NavLink to="/">Chính sách hàng hóa</NavLink>
                            <NavLink to="/">Chính sách giao hàng</NavLink>
                            <NavLink to="/">Tuyển dụng</NavLink>
                        </div>
                        <div className='col-3 box-footer'>
                            <h5 className='text-center'>Chương trình khuyến mãi </h5>
                            <NavLink to="/">Khách hàng thân thiết</NavLink>
                            <NavLink to="/">Khách hàng vip</NavLink>
                            <NavLink to="/">Khách hàng mới</NavLink>
                            <NavLink to="/">Còn nhiều ưu đãi khác chờ bạn khám phá</NavLink>
                            <div></div>


                        </div>
                        <div className='col-3 box-footer'>
                            <h5 className='text-center'>Tổng đài CSKH</h5>
                            <NavLink to="/">Hỗ trợ đặt hàng và khiếu nại 0889946303</NavLink>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className='col-3 box-footer'>
                            <h5 className='text-center'>Theo dõi chúng tôi trên</h5>
                            <div className='icon-footer'><i className="facebook fa fab fa-facebook-f"></i> Facebook</div>
                            <div className='icon-footer'><i className="youtube fa fab fa-youtube"></i> Youtube</div>
                            <div className='icon-footer'><i className="google fa fab fa-google"></i> Google</div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Footer;