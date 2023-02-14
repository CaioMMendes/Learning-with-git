import React from "react";
import { useState } from "react";
import styles from "../css/pagesStyles/RegisterUser.module.css";
import { Link } from "react-router-dom";
import { object } from "prop-types";
const RegisterUser = ({ isDark }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      alert("Em construção");
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  return (
    <div className="container">
      <div className={`${styles.loginBox} ${!isDark && styles.loginBoxLight} `}>
        <div className={styles.registerContainer}>
          <h1>Register</h1>
          <form action="">
            <div className={styles.box}>
              <div className={styles.userBox}>
                <input type="text" onKeyUp={handleKeypress} required />
                <label>
                  Username <span>*</span>
                </label>
              </div>

              <div className={styles.userBox}>
                <input
                  //todo metodo para colocar 2 classes styles
                  // className={`${
                  //   showPassword ? `${styles.inputPassword} ${styles.a}` : ""
                  // }`}
                  className={styles.inputPassword}
                  type={`${showPassword ? "text" : "password"}`}
                  onKeyUp={handleKeypress}
                  required
                />
                <label>
                  {" "}
                  Password <span>*</span>
                </label>
                <div
                  className={`${showPassword && `${styles.hide} `} ${
                    styles.show
                  }`}
                  onClick={togglePassword}
                ></div>
              </div>
              <div className={styles.userBox}>
                <input
                  className={styles.inputPassword}
                  type={`${showPasswordConfirm ? "text" : "password"}`}
                  onKeyUp={handleKeypress}
                  required
                />
                <label>
                  {" "}
                  Confirm password <span>*</span>{" "}
                </label>
                <div
                  className={`${showPasswordConfirm && `${styles.hide} `} ${
                    styles.show
                  }`}
                  onClick={togglePasswordConfirm}
                ></div>
              </div>
            </div>
            <div className={styles.buttonForm}>
              <a href="#" className={styles.submit}>
                Submit
              </a>
              {/* <Button>Submits</Button> */}
              <div className={styles.register}>
                <p>Have an account?</p>
                <Link to="/account/login">Sign in</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
