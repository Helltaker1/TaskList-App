// @ts-ignore
import user from "../Assets/uzytkownik.png"
import React from "react";
function UserMenu() {
    return (
        <div>
            <img src={user} alt="Użytkownik" className="UserIcon"/>
            <p>Użytkownik</p>
        </div>
    );
}

export default UserMenu;
