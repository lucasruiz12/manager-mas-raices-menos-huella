import React, { useEffect, useState } from 'react';
import { ACCESS_TOKEN, IS_AUTHENTICATED } from '../../constants';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import connections from '../../connections';
import './style.css';

const Login = () => {

    const [formData, setFormData] = useState({
        user: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const changeData = (event, data) => {
        if (data) {
            setFormData({
                ...formData,
                [data.name]: data.value,
            });
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        };
    };

    const submitData = async (e) => {
        e.preventDefault();

        setLoading(true);

        const { user: email, password } = formData;

        const userData = {
            email,
            password,
        };

        try {
            const { data } = await connections.loginUser(userData);
            if (data.success && data.user) {
                const { token } = data;
                const { email, name, id, admin } = data.user
                const isAuthenticated = { email, name, id, admin };
                if (admin) {
                    localStorage.setItem(IS_AUTHENTICATED, JSON.stringify(isAuthenticated));
                    localStorage.setItem(ACCESS_TOKEN, token);
    
                    setTimeout(() => {
                        setLoading(false);
                        window.location.href = "/home"
                    }, 1500);
                } else {
                    setTimeout(() => {
                        toast.error('Error!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            transition: Bounce,
                        });
                        setLoading(false);
                    }, 2000);
                };

            } else {
                setTimeout(() => {
                    toast.error('Error!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                    setLoading(false);
                }, 2000);
            };
        } catch (err) {
            console.error(err.response);
            const { message } = err.response.data;
            setTimeout(() => {
                toast.error(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setLoading(false);
                console.error(err);
            }, 2000);
        };
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem(IS_AUTHENTICATED));

        if (user) {
            window.location.href = "/home";
        };

    }, []);

    return (
        <div>
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