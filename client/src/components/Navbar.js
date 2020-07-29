import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
       <div className="navbar-container">

          <div>
             <Link className="navbar-link-content">
                <i class="fas fa-home"></i>
             </Link>
          </div>

          <div>
             <Link className="navbar-link-content">
                <i class="fas fa-shopping-bag"></i>    
             </Link>
          </div>

          <div>
             <Link className="navbar-link-content">
                <i class="fas fa-shopping-cart"></i>
             </Link>
          </div>

          <div>
             <Link className="navbar-link-content">
                <i class="fas fa-user-circle"></i>
             </Link>
          </div>

       </div>
    );
}