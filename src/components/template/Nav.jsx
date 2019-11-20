  
import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
<aside className="menu-area">
        <nav className="menu">
            {/* Refatorar em casa! */}
           <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/mercado">
                <i className="fa fa-dollar"></i> Mercado
            </Link>
            <Link to="/oportunidade">
                <i className="fa fa-bar-chart"></i> Oportunidades
            </Link>
            <Link to="/relatorio">
                <i className="fa fa-line-chart"></i> Relatórios
            </Link>
        </nav>
    </aside>