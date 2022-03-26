import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import avatar from "../assets/images/avatar.png";
import { Button } from 'react-bootstrap';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/dashboard");
    }, [user, loading]);

    return (
        <div className="">
            <header className="header">
                <div className="wrapper">
                    <div className="header__inner">
                        <div className="header__logo">
                            <img src={avatar}></img>
                            <h1>LEGO TAMAGOTCHI</h1>
                        </div>
    
                    </div>
                </div>
            </header>
            <div className="wrapper">
                <div className="form-wrapper">
                    <div className="form">
                        <h1>Admin</h1>
                        <div className="form__input-wrapper">
                            <input className="form__input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                            <input className="form__input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                        </div>
                        <Button variant="dark" onClick={() => logInWithEmailAndPassword(email, password)}>Log In</Button>
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
