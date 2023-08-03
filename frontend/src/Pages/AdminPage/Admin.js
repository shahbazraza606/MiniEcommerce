import React from "react";
import "./Admin.css";

import { useNavigate } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="adminbody">
      <h1>Admin Page</h1>
      <div className="btnbody">
        <div>
          <button class="glowing-btn">
            <a href="/add">
              <span class="glowing-txt">
                A<span class="faulty-letter">D</span>D
              </span>
            </a>
          </button>
          <button class="glowing-btn">
            <a href="/display">
              <span class="glowing-txt">
                D<span class="faulty-letter">I</span>SPLAY
              </span>
            </a>
          </button>
          <button class="glowing-btn">
            <a href="/">
              <span class="glowing-txt">
                U<span class="faulty-letter">S</span>ER VIEW
              </span>
            </a>
          </button>
          <button onClick={handleLogout} class="glowing-btn">
            <span class="glowing-txt">
              L<span class="faulty-letter">O</span>GOUT
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
