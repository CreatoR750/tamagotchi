import React, { useEffect, useReducer, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase/firebase";
import avatar from "../assets/images/avatar.png";
import { Button, Spinner } from "react-bootstrap";
import UserCard from "../components/UserCard";
import axios from "axios";

const Users = () => {
    const [user, loading, error] = useAuthState(auth);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return <Spinner animation="border" />;
        if (!user) return navigate("/");
    }, [user, loading]);

    useEffect(() => {
        getUsersList();
    }, []);

    const getUsersList = async () => {
        try {
            const response = await axios.get("https://tamagotchi-backend.herokuapp.com/user");
            setUsers(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const receiveChildValue = () => {
        getUsersList();
      };

    return (
        <div className="">
            <header className="header">
                <div className="wrapper">
                    <div className="header__inner">
                        <div className="header__logo">
                            <img src={avatar}></img>
                            <h1>LEGO TAMAGOTCHI</h1>
                        </div>
                        <div className="header__name">
                            <h3>logged in as {user?.email}</h3>
                        </div>
                        <div className="header__name">
                            <Button variant="dark" onClick={()=>navigate("/dashboard")}>
                                Back
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
            <div className="wrapper">
                <h1>Users</h1>
                <div className="users-list-wrapper">
                    {users.length ? (
                        users.map((user) => {
                            return <UserCard user={user} updateUsers={receiveChildValue}/>;
                        })
                    ) : (
                        <Spinner animation="border" />
                    )}
                 
                </div>
            </div>
            <footer></footer>
        </div>
    );
};

export default Users;
