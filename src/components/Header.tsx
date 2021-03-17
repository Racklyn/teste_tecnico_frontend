import React from 'react';
import '../styles/header.css';
import Routes from '../routes'
import { type } from 'node:os';


function Header({selected=1}) {

    return (
        <header>
            <div className="header-title">
                <h1>Countries</h1>
                <p className="logo">logo?</p>
            </div>
            <div className="header-menu">
                <a href="#" className={selected==1?"selected-option":""}>CONTINENTES</a>
                <a href="#" className={selected==2?"selected-option":""}>PAÍSES</a>
                <a href="#" className={selected==3?"selected-option":""}>IDIOMAS</a>
            </div>
        </header>
     );
}

export default Header;
