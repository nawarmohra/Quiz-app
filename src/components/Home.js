import React, {Fragment} from 'react';
// import { Icon } from '@iconify/react';
import logo from '../assets/img/JaywayLogo.png';
import play from '../assets/img/play.gif';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const Home = () => ( 
    <Fragment>
        <Helmet> <title>Programming assignment - Home</title></Helmet>
        <div id="home">
            <section>
                <div style={{ textAlign: 'center' }}>
                <img className="logo" src={logo} alt="Logo" />
                    {/* <span className='mdi gamepad-circle-left'><Icon icon="mdi:gamepad-circle-left" /></span> */}
                </div>
                <h1>Jayway </h1><p className="subTitle">Programming Assignment</p>
                <div className= "play-button-container">
                    <ui>
                        <li ><Link className= "play-button" to="/play/instructions">Play</Link></li>
                    </ui>
                </div>
                <div className= "auth-container">
                    <p>This quiz game is a challenge</p>
                </div>
                <div className= "auth-container">
                <img className="play-img" src={play} alt="play" />
                </div>
                {/* <div className= "auth-container">
                        <Link to="/login" className="auth-button" id="login-button">Login</Link>
                        <Link to="/register" className="auth-button" id="register-button">Sign Up</Link>
                </div>*/}
            </section>
        </div>
    </Fragment>

);

export default Home;