import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
       <div className="navbar-container">
          <div>
             <Link to="/" className="navbar-link-content">
                <i className="fas fa-home"></i>
             </Link>
          </div>

          <div>
             <Link to="/superpowers" className="navbar-link-content">
                <i className="fab fa-superpowers"></i>  
             </Link>
          </div>

          <div>
             <Link to="/cart" className="navbar-link-content">
                <i className="fas fa-shopping-cart"></i>
             </Link>
          </div>

          <div>
             <Link to="/users" className="navbar-link-content">
                <i class="fas fa-user-circle"></i>
             </Link>
          </div>

       </div>
    );
}