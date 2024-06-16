import React from 'react'
import "../Components/LoginSignup/AfterLogin.css";
// import TestDatabase from '../../testDatabase'
import AppLogo from '../Components/AdminView/AppLogo.tsx'
import NavigationBar from '../Components/AdminView/NavigationBar.tsx'
import LogOut from '../Components/AdminView/LogOut.tsx';
import UserMenu from '../Components/AdminView/UserMenu.tsx';
import OpinionsViev from './OpinionsViev.jsx';
import SayHello from "../Components/AdminView/SayHello.tsx";

const Opinions = () => {
    return (
        <>
            <div className="leftSide">
                <div className="AppLogo">
                    <AppLogo/>
                </div>

                <div className="NavigationBar">
                    <NavigationBar/>
                </div>

                <div className="LogOut">
                    <LogOut/>
                </div>
            </div>

            <div className="centerSide">
                <div className="SayHello">
                    <div className="Blank">
                        <SayHello/>
                    </div>
                </div>

                <div className="TasksList">
                    <OpinionsViev/>
                </div>
            </div>

            <div className="rightSide">
                <div className="UserMenu">
                    <UserMenu/>
                </div>
                {/*<div className="CategoriesList">*/}
                {/*    <AdminsList/>*/}
                {/*</div>*/}
                {/*<div className="CategoriesList">*/}
                {/*    <Report/>*/}
                {/*</div>*/}
            </div>

        </>
    )
}

export default Opinions
