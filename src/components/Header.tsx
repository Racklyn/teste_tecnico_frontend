import React from 'react';
import '../styles/header.css';
import {Link} from 'react-router-dom'


function Header({selected=1}) {

    return (
        <header>
            <div className="header-title">
                <h1>Countries</h1>
                <p className="logo">logo?</p>
            </div>
            <div className="header-menu">
                <Link to="/" className={selected===1?"selected-option":""}>CONTINENTES</Link>
                <Link to="/PaisesPop" className={selected===2?"selected-option":""}>PAÍSES</Link>
                <Link to="#" className={selected===3?"selected-option":""}>IDIOMAS</Link>
            </div>
        </header>
     );
}

export default Header;
