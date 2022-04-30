import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    ArgoAccess
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/leafDisease'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Leaf Disease
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/hi' className='nav-links' style={{ color: "green" }} onClick={closeMobileMenu}>
                            A/आ
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;