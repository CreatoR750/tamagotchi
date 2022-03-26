import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import avatar from "../assets/images/avatar.png";
import boy from "../assets/images/boy.png";
import girl from "../assets/images/girl.png";
import mask from "../assets/images/Mask Group.png";
import { Button, Spinner } from "react-bootstrap";
import ProgressBar from "@ramonak/react-progress-bar";
import health from "../assets/images/health.png";
import play from "../assets/images/play.png";
import food from "../assets/images/food.png";
import cheer from "../assets/images/cheer.png";
import axios from "axios";

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [users, setUsers] = useState([]);
    const [isInputShow, setIsInputShow] = useState(false);
    const [inputUrl, setInputUrl] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [generalStatus, setGeneralStatus] = useState(0);
    const [healthStatus, setHealthStatus] = useState(0);
    const [playStatus, setPlayStatus] = useState(0);
    const [satietyStatus, setSatietyStatus] = useState(0);
    const [cheerStatus, setCheerStatus] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return <Spinner animation="border" />;
        if (!user) return navigate("/");
    }, [user, loading]);

    useEffect(() => {
        getUsersList();
    }, []);

    useEffect(() => {
        getUrlList();
    }, []);

    const getUrlList = async () => {
        try {
            const response = await axios.get(`https://tamagotchi-backend.herokuapp.com/image_data`);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const sendImgUrl = async () => {
        try {
            const auth = await axios.post("https://tamagotchi-backend.herokuapp.com/user/login", {
                login: "string",
                password: "string",
            });

            const response = await axios.post(
                `https://tamagotchi-backend.herokuapp.com/image_data/`,
                { url: inputUrl },
                {
                    headers: {
                        Authorization: `Bearer ${auth.data.access_token}`,
                    },
                }
            );
            console.log(response.data);
            setImageUrl(inputUrl);
        } catch (err) {
            console.log(err);
        }
    };

    const getUsersList = async () => {
        try {
            const response = await axios.get("https://tamagotchi-backend.herokuapp.com/user");
            setUsers(response.data);
            console.log(response.data);
            statusCount(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const statusCount = (users) => {
        let statusCounter = { health: 0, play: 0, satiety: 0, cheer: 0, general_state: 0 };
        users.map(
            (user) => (
                user.tamagochi?.general_state == undefined ? console.log("undefined") : (statusCounter.general_state += user.tamagochi.general_state),
                user.tamagochi?.health == undefined ? console.log("undefined") : (statusCounter.health += user.tamagochi.health),
                user.tamagochi?.game == undefined ? console.log("undefined") : (statusCounter.play += user.tamagochi.game),
                user.tamagochi?.food == undefined ? console.log("undefined") : (statusCounter.satiety += user.tamagochi.food),
                user.tamagochi?.sleep == undefined ? console.log("undefined") : (statusCounter.cheer += user.tamagochi.sleep)
            )
        );
        setGeneralStatus(Math.floor((statusCounter.general_state / users.length) * 100));
        setHealthStatus(Math.floor((statusCounter.health / users.length) * 100));
        setPlayStatus(Math.floor((statusCounter.play / users.length) * 100));
        setSatietyStatus(Math.floor((statusCounter.satiety / users.length) * 100));
        setCheerStatus(Math.floor((statusCounter.cheer / users.length) * 100));
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
                            <Button variant="dark" onClick={logout}>
                                LOG OUT
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
            <div className="wrapper">
                <div className="control-wrapper">
                    <div className="control__left">
                        <div>
                            <h1>control</h1>
                            <h1>TAMAGOTCHI !</h1>
                        </div>
                        <div>
                            <a className="control__link" onClick={() => navigate("/users")}>
                                CORRECT USERS
                            </a>
                            <div className="control__users">
                                <div>
                                    <img src={boy} />
                                </div>
                                <div>
                                    <img src={girl} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={imageUrl ? imageUrl : mask} />
                        <div>
                            <a
                                className="control__link"
                                onClick={() => {
                                    setIsInputShow((prev) => !prev);
                                }}
                            >
                                Choose your welcome screen
                            </a>
                        </div>
                        {isInputShow && (
                            <div className="control__input">
                                <div>
                                    <label>Enter link</label>
                                    <input type="url" placeholder="url" onChange={(e) => setInputUrl(e.target.value)} />
                                </div>

                                <Button variant="dark" onClick={() => sendImgUrl()}>
                                    Send
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="state-wrapper">
                    <a
                        className="control__link"
                        onClick={() => {
                            navigate("/status");
                        }}
                    >
                        WATCH TAMA STATUS
                    </a>
                    <h4>GENERAL STATE</h4>

                    <ProgressBar completed={generalStatus} bgColor="#00C6E1" height="32px" animateOnRender={true} />

                    <div className="state-all">
                        <div className="state-all__status">
                            <div>
                                <img src={play} />
                            </div>
                            <div className="state__progress-bar">
                                <h3>PLAY</h3>
                                {playStatus ? <ProgressBar completed={playStatus} bgColor="#C00296" height="32px" animateOnRender={true} /> : <></>}
                            </div>
                        </div>
                        <div className="state-all__status">
                            <div>
                                <img src={food} />
                            </div>
                            <div className="state__progress-bar">
                                <h3>SATIETY</h3>
                                <ProgressBar completed={satietyStatus} bgColor="#027900" height="32px" animateOnRender={true} />
                            </div>
                        </div>
                        <div className="state-all__status">
                            <div>
                                <img src={health} />
                            </div>
                            <div className="state__progress-bar">
                                <h3>HEALTH</h3>
                                <ProgressBar completed={healthStatus} bgColor="#F4C31E" height="32px" animateOnRender={true} />
                            </div>
                        </div>
                        <div className="state-all__status">
                            <div>
                                <img src={cheer} />
                            </div>
                            <div className="state__progress-bar">
                                <h3>CHEERFULNESS</h3>
                                <ProgressBar completed={cheerStatus} bgColor="#3037E3" height="32px" animateOnRender={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer></footer>
        </div>
    );
};
export default Dashboard;
