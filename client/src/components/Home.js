import React, {useState} from "react";
import { Link } from 'react-router-dom';

export default function Home(props) {
  const { handleClick } = props;
  const [isSignedIn, setState] = useState(false);

  return (
    <div className="Home-content">
      <div className="Home-header">
        <div className="text-logo">The QCC Shopper</div>
        <img src="marvel.jpg" alt="" width="570" height="250"/>
      </div>

      <div className="Home-footer"> 
         <div>
            <h1> Marvel Fan? </h1>
            <p> and not a part of our marvelous community? </p>
            <p> Well, hurry up and join in the fun by signing up for an account and grabbing your own unique superpower!! </p>
            <div className="sign-up-container">
               {isSignedIn ? <Link to="/login" onClick={() => handleClick('/login')}> <button className="sign-up-btn"> Login </button> </Link> : <Link to="/signup" onClick={() => handleClick('/signup')}> <button className="sign-up-btn"> Sign up </button> </Link>}
            </div>
         </div>
         <div>
            <h1> Welcome to the marvel family! Have a look around! </h1>
            <img src="marvel_logo.png" alt="" width="300" />
         </div>
         <div>
            <h1> About: </h1>
            <p> In this site, you'll find some of the most awesome, powerful superpowers known to man, and it all can be within your grasp! But of course, there's a catch. Since you can't find these powers anywhere else in the world, the prices can be quite exorbitant. Nonetheless, you won't regret it..Happy shopping! </p>
         </div>
      </div>

    </div>
  );
}
