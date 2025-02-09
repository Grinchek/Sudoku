import './style.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Header = () => {
    let index = 0;
    const storedUsers = localStorage.getItem("listUsers");
    const userList = JSON.parse(storedUsers) || [];
    const signedIn = userList.some(obj => obj.signedIn === true);
    const navigate = useNavigate();
    const headerButtonStyle = {
        display: "flex",
        justifyContent: 'center',
    };
    const logOutButtonHandler = () => {
        for (const user of userList) {
            if (user.signedIn === true) {
                const newUser = {
                    userName: user.userName,
                    password: user.password,
                    signedIn: false,
                    wins: user.wins,
                    loses: user.loses

                }
                index = userList.indexOf(user);
                userList.splice(index, 1)
                userList.push(newUser);
                localStorage.removeItem("listUsers");
                localStorage.setItem("listUsers", JSON.stringify(userList));

            }

        }
        navigate('/');
    }

    return (
        <>
            <div className="header-container">
                <h1>{signedIn}</h1>
            </div>
            {console.log(signedIn)}

            <div style={headerButtonStyle}>
                {

                    signedIn ? (
                        <>
                            <button className='new-game-button' onClick={() => navigate('/menu')}>New Game</button>
                            <button className='new-game-button' onClick={() => logOutButtonHandler()}>Logout</button>
                        </>

                    ) :
                        (
                            <button className='new-game-button' onClick={() => navigate('/login')}>Log in / Sign in</button>
                        )
                }


            </div >

        </>
    )
}
export default Header;