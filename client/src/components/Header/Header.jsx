import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Header.css";
import { CartContext } from '../CartDetails/CartContext';
import { AuthContext } from '../../context/AuthContext';
import menuClose from '/menuClose.png';
import menuOpen from '/menuOpen.png';

function Header() {
    const { cart } = useContext(CartContext);
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [menu, setMenu] = useState("home");
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);

    
    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/shop') {
            setMenu('shop');
        } else if (currentPath === '/') {
            setMenu('home');
        }
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        setShowMenu(false); 
    };

    const handleLinkClick = (menuName) => {
        setMenu(menuName);
        setShowMenu(false); 
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to='/'><img src="/logoHome.png" className="logo" alt="Logo" /></Link>
            </div>

            <ul className="desktopMenu">
                <li onClick={() => setMenu("home")}>
                    <Link className='navLink' to='/'>Home</Link>
                    {menu === "home" && <hr />}
                </li>
                <li onClick={() => setMenu("shop")}>
                    <Link className='navLink' to='/shop'>Shop</Link>
                    {menu === "shop" && <hr />}
                </li>
            </ul>

            <div className='navLoginCart'>
                <Link to='/cart'><img src="/cartImg.png" alt="Cart" /></Link>
                <div className='cartCount'>{cart.length}</div>
                {isAuthenticated ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <Link to='/delivered'><img src="/DeliveredIcon.png" alt="Delivered" /></Link>
            </div>

            <img src={showMenu ? menuClose : menuOpen} className="mobMenu" alt="Menu" onClick={() => setShowMenu(!showMenu)} />

            <div className="navMenu" style={{ display: showMenu ? 'flex' : 'none' }}>
                <Link to='/' className="listItem" onClick={() => handleLinkClick('home')}>Home</Link>
                <Link to='/shop' className="listItem" onClick={() => handleLinkClick('shop')}>Shop</Link>
                <Link to='/cart' className="listItem" onClick={() => handleLinkClick('cart')}>Cart</Link>
                <Link to='/delivered' className="listItem" onClick={() => handleLinkClick('delivered')}>Delivered</Link>
                {isAuthenticated ? (
                    <Link to='/login' className="listItem" onClick={handleLogout}>Logout</Link>
                ) : (
                    <Link to='/login' className="listItem" onClick={() => handleLinkClick('login')}>Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Header;