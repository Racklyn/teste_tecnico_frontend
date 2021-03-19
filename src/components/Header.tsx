import React from 'react';
import '../styles/header.css';
import {Link} from 'react-router-dom'
import Logo from '../assets/imgs/logo.png'


function Header({selected=1}) {

    return (
        <header>
            <div className="header-title">
                <h1>Countries</h1>
                <div className="logo">
                    <img src={Logo} alt="Mediar"/>
                </div>
            </div>
            <div className="header-menu">
                <Link to="/" className={selected===1?"selected-option":""}>CONTINENTES</Link>
                <Link to="/paisesPop" className={selected===2?"selected-option":""}>PAÍSES</Link>
                <Link to="/idiomas" className={selected===3?"selected-option":""}>IDIOMAS</Link>
            </div>
        </header>
     );
}

export default Header;
