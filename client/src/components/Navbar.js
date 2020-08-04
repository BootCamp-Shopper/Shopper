import React  from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    const { handleClick, activeLink } = props;
    
    // An inbuilt method of the window object: window.onpopstate 
    // The primary reason for this method is so that duplicate URLS won't be stacked
    // on top of one another (this occurs when the same link is clicked multiple times) since those dups undermine the functionality of the browser back button.
    // this method runs only if browser back button was clicked.
    onpopstate = () => {
       handleClick(document.location.pathname);
    }

    return (
       <div className="navbar-container">
          <div>
             <Link to="/" className={activeLink === '/' ? 'selected' : "navbar-link-content"} onClick={() => handleClick('/')}>
                <i className="fas fa-home"></i>
             </Link>
          </div>

          <div>
             <Link to="/superpowers" className={activeLink === '/superpowers' || activeLink === `/superpowers/${document.location.pathname.match(/\d/g)}` ? 'selected' : "navbar-link-content"} onClick={() => handleClick('/superpowers')} >
                <i className="fab fa-superpowers"></i>  
             </Link>
          </div>

          <div>
             <Link to="/cart" className={activeLink === '/cart' ? 'selected' : "navbar-link-content"} onClick={() => handleClick('/cart')} >
                <i className="fas fa-shopping-cart"></i>
             </Link>
          </div>

          <div>
             <Link to="/users" className={activeLink === '/users' || activeLink === `/users/${document.location.pathname.match(/\d/g)}` ? 'selected' : "navbar-link-content"} onClick={() => handleClick('/users')} >
                <i className="fas fa-user-circle"></i>
             </Link>
          </div>

       </div>
    );
}