import React, { useEffect, useState } from 'react';
import { ACCESS_TOKEN, IS_AUTHENTICATED } from '../../helpers/constants';
import logoFull from '../../assets/logos/logo-TAO-brown.svg';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import './style.css';

const Login = () => {

    return (
        <div className="container-login">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <form className="form-login" onSubmit={submitData}>
                <div className="title-login">
                    <img className="login-logo" src={logoFull} alt="LOG" />
                    <div className="text-login-container">
                        <p className="text-welcome">Bienvenido(a)</p>
                        <p className="text-carbon">Soy carbono neutro</p>
                    </div>
                </div>
                <div className="container-input-form-login">
                    <label className="input-title" htmlFor="user">
                        Usuario:
                    </label>
                    <input
                        className="input-form"
                        type="text"
                        id="user"
                        name="user"
                        onChange={changeData}
                    />
                </div>
                <div className="container-input-form-login">
                    <label className="input-title" htmlFor="password">
                        Contraseña:
                    </label>
                    <input
                        className="input-form"
                        type="password"
                        id="password"
                        name="password"
                        onChange={changeData}
                    />
                </div>
                <div className="link-container">
                    {
                        loading ?
                            <button className="btn-green-login">
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </button>
                            :
                            <input
                                type="submit"
                                value="Iniciar sesión"
                                className={`btn-green-login${(formData.user === "" ||
                                    formData.password === "" ||
                                    formData.password.length < 7) ? " disabled" : ""}`}
                                disabled={
                                    formData.user === "" ||
                                    formData.password === "" ||
                                    formData.password.length < 7
                                }
                            />
                    }
                </div>
            </form>
        </div>
    );
};

export default Login;