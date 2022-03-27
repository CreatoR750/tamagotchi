import React, { useEffect, useState } from "react";
import boy from "../assets/images/boy.png";
import girl from "../assets/images/girl.png";
import del from "../assets/images/delete.svg";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import health from "../assets/images/health.png";
import play from "../assets/images/play.png";
import food from "../assets/images/food.png";
import cheer from "../assets/images/cheer.png";
import ToggleButton from "react-toggle-button";
import { Button, Spinner } from "react-bootstrap";

const UserStatusCard = ({ user }) => {
    const [showInfo, setShowInfo] = useState(Boolean);
    const [tama, setTama] = useState(user.tamagochi);
   

    useEffect(() => {
        const newGeneralState = Number(tama.food + tama.health + tama.game + tama.sleep) / 4;
        setTama((prev) => ({ ...tama, general_state: newGeneralState }));
    }, [tama.game, tama.food, tama.health, tama.sleep]);

    const updateTama = async (id) => {
        try {
            const auth = await axios.post("https://tamagotchi-backend.herokuapp.com/user/login", {
                login: "string",
                password: "string",
            });

            console.log(auth.data.access_token);
            const response = await axios.put(
                `https://tamagotchi-backend.herokuapp.com/tamagochi/?user_id=${id}`,
                { name: "string", gender: "string", game: tama.game, health: tama.health, food: tama.food, sleep: tama.sleep },
                {
                    headers: {
                        Authorization: `Bearer ${auth.data.access_token}`,
                    },
                }
            );
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }

    };
    const resetTama = ()=> {
        setTama(user.tamagochi)
    }

    return (
        <div className="user-status-wrapper">
            <div className="user-status-card">
                <div className="status-card" onClick={() => setShowInfo((prev) => !prev)}>
                    <img src={tama.gender === "Boy" ? boy : girl}></img>
                    <h2>{user.login}</h2>
                    <ToggleButton inactiveLabel={""} activeLabel={""} value={showInfo} onToggle={() => setShowInfo((prev) => !prev)} />
                </div>
                {showInfo && (
                    <div className="status-btn">
                        <Button variant="secondary" onClick={()=>resetTama()}>Cancel</Button>
                        <Button variant="dark" onClick={()=>updateTama(tama.user_id)}>Apply</Button>
                    </div>
                )}
            </div>
            {showInfo && (
                <div className="status-all__status">
                    <div className="status">
                        <h4>GENERAL STATE</h4>
                        <div className="state__progress-bar">
                            <ProgressBar completed={Math.round(tama.general_state * 100)} bgColor="#00C6E1" height="32px" animateOnRender={true} />
                        </div>
                    </div>
                    <div className="status">
                        <div>
                            <img
                                className="status-change-btn"
                                src={play}
                                onClick={() => (tama.game >= 0.99 ? setTama((prev) => ({ ...tama, game: 1 })) : setTama((prev) => ({ ...tama, game: prev.game + 0.1 })))}
                            />
                        </div>
                        <div className="state__progress-bar">
                            <h3>PLAY</h3>
                            <ProgressBar completed={Math.round(tama.game * 100)} bgColor="#C00296" height="32px" animateOnRender={true} />
                        </div>
                    </div>
                    <div className="status">
                        <div>
                            <img
                                className="status-change-btn"
                                src={health}
                                onClick={() =>
                                    tama.health >= 0.99 ? setTama((prev) => ({ ...tama, health: 1 })) : setTama((prev) => ({ ...tama, health: prev.health + 0.1 }))
                                }
                            />
                        </div>
                        <div className="state__progress-bar">
                            <h3>HEALTH</h3>
                            <ProgressBar completed={Math.round(tama.health * 100)} bgColor="#F4C31E" height="32px" animateOnRender={true} />
                        </div>
                    </div>
                    <div className="status">
                        <div>
                            <img
                                className="status-change-btn"
                                src={food}
                                onClick={() => (tama.food >= 0.99 ? setTama((prev) => ({ ...tama, food: 1 })) : setTama((prev) => ({ ...tama, food: prev.food + 0.1 })))}
                            />
                        </div>
                        <div className="state__progress-bar">
                            <h3>SATIETY</h3>
                            <ProgressBar completed={Math.round(tama.food * 100)} bgColor="#027900" height="32px" animateOnRender={true} />
                        </div>
                    </div>
                    <div className="status">
                        <div>
                            <img
                                className="status-change-btn"
                                src={cheer}
                                onClick={() =>
                                    tama.sleep >= 0.99 ? setTama((prev) => ({ ...tama, sleep: 1 })) : setTama((prev) => ({ ...tama, sleep: prev.sleep + 0.1 }))
                                }
                            />
                        </div>
                        <div className="state__progress-bar">
                            <h3>CHEERFULNESS</h3>
                            <ProgressBar completed={Math.round(tama.sleep * 100)} bgColor="#3037E3" height="32px" animateOnRender={true} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserStatusCard;
