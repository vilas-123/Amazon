import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/ContextProvider';
import { Link } from 'react-router-dom';

function Index() {
    const navigate = useNavigate();
    const { userId, setUserId } = useContext(AuthContext);
    const { superuser, setsuperuser } = useContext(AuthContext);

    const logout = (e) => {
        setUserId('');
        setsuperuser(false);
        localStorage.removeItem('userId');
        localStorage.removeItem('superuser');
        navigate('/store');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Beehyv
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/store">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/store">
                                Store
                            </Link>
                        </li>
                        {localStorage.getItem('superuser') === 'true' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/AddProduct">
                                    Add Product
                                </Link>
                            </li>
                        )}
                        {userId && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    Cart
                                </Link>
                            </li>
                        )}
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Account
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {!userId && (
                                    <>
                                        <Link className="dropdown-item" to="/login">
                                            Login
                                        </Link>
                                        <Link className="dropdown-item" to="/signup">
                                            Signup
                                        </Link>
                                    </>
                                )}
                                {userId && (
                                    <>
                                        <Link className="dropdown-item" to="/profile">
                                            Your Profile
                                        </Link>
                                        <Link className="dropdown-item" to="/order">
                                            Your Order
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <button className="dropdown-item" onClick={logout}>
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Index;
