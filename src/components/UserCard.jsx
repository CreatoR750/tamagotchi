import React from "react";
import boy from "../assets/images/boy.png";
import girl from "../assets/images/girl.png";
import del from "../assets/images/delete.svg";
import axios from "axios";

const UserCard = ({user, updateUsers}) => {
    
    const deleteUser = async (id) => {
        try {
            const auth = await axios.post("https://tamagotchi-backend.herokuapp.com/user/login", {
                "login": "string",
                "password": "string"
              })

              console.log(auth.data.access_token);
              
            const response = await axios.delete(`https://tamagotchi-backend.herokuapp.com/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.data.access_token}`
                },
            });
            console.log(response.data);
            updateUsers();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="user-card">
            <img src={user.tamagochi?.gender === "Boy" ? boy : girl}></img>
            <h2>{user.login}</h2>
            <img
                style={{ height: "45px" }}
                src={del}
                onClick={() => {
                    deleteUser(user.id);
                }}
            />
        </div>
    );
};

export default UserCard;
