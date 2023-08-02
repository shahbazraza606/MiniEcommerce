import React from "react";
import './Admin.css'
const Admin = () => {
    return (
        <div className="adminbody">
        <h1>Admin Page</h1>
        <div className="btnbody">
            <div>
            <button class='glowing-btn'><a href="/add"><span class='glowing-txt'>A<span class='faulty-letter'>D</span>D</span></a></button>
        <button class='glowing-btn'><a href="/display"><span class='glowing-txt'>D<span class='faulty-letter'>I</span>SPLAY</span></a></button>
        <button class='glowing-btn'><a href="/"><span class='glowing-txt'>U<span class='faulty-letter'>S</span>ER VIEW</span></a></button>
            </div>
       
        </div>
       

        </div>
    );
}

export default Admin;