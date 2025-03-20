import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { IS_AUTHENTICATED } from '../../constants';
import Spinner from 'react-bootstrap/Spinner';
// import connections from '../../connections';
import DatePicker from 'react-datepicker';
import Navbar from '../../components/Navbar';
import NewSeed from '../../components/NewSeed';
import ModalCode from '../../components/ModalCode';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { db } from '../../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const Home = () => {
    const [newNotification, setNewNotification] = useState({
        title: "",
        body: "",
        timestamp: "",
    });

    const [currentTab, setCurrentTab] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [creationInProgress, setCreationInProgress] = useState(false);

    const handleInputChange = (e) => {

        if (e.target) {
            setNewNotification({
                ...newNotification,
                [e.target.name]: e.target.value,
            });
        } else {
            setNewNotification({
                ...newNotification,
                timestamp: e,
            });
        };
    };

    const handleCreationClick = async () => {

        const notificationsCollection = collection(db, "notifications")

        try {
            setCreationInProgress(true);
            // saveNotification(newNotification)
            const docRef = await addDoc(notificationsCollection, newNotification);
            
            setTimeout(() => {
                setNewNotification({
                    title: "",
                    body: "",
                    timestamp: "",
                });
                setCreationInProgress(false);
                toast.success(`Push notification creada exitosamente (id: ${docRef.id})`, { autoClose: 2000 });
            }, 1500);
        } catch (err) {
            setTimeout(() => {
                setNewNotification({
                    title: "",
                    body: "",
                    timestamp: "",
                });
                setCreationInProgress(false);
                toast.error("Error al crear push notification", { autoClose: 2000 });
            }, 1500);
            console.error(err)
        }
    };

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem(IS_AUTHENTICATED))?.id && !JSON.parse(localStorage.getItem(IS_AUTHENTICATED))?.admin ) {
            window.location.href = "/"
        };
    }, []);


    return (
        <div className="full-container">
            <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <div className="head-decoration"></div>
            {
                currentTab === 1 ?
                    <div className="container p-4 form-container">
                        <form className="form-search">
                            <h2 className="mb-4" style={{ display: "flex", justifyContent: "center" }}>Administrador de notificaciones</h2>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label mt-4">Título de notificación</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newNotification.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Ingrese título"
                                />
                                <label htmlFor="body" className="form-label mt-4">Cuerpo de notificación</label>
                                <input
                                    type="text"
                                    id="body"
                                    name="body"
                                    value={newNotification.body}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Ingrese cuerpo de mensaje"
                                />
                                <label htmlFor="specificDay" className="form-label mt-4">Día y hora</label>
                                <div className="form-control">
                                    <DatePicker
                                        selected={newNotification.timestamp}
                                        onChange={handleInputChange}
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        timeFormat="HH:mm"
                                        minDate={new Date()}
                                        showTimeSelect
                                        className="form-date-control"
                                        placeholderText="Seleccione una fecha"
                                        disabledKeyboardNavigation
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <button
                                    type="button"
                                    className="btn btn-success btn-download-csv"
                                    onClick={() => handleCreationClick()}
                                    disabled={(creationInProgress || !newNotification.timestamp || !newNotification.title || !newNotification.body)}
                                >
                                    {
                                        creationInProgress ?
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            :
                                            "CREAR NOTIFICACIÓN"
                                    }
                                </button>
                            </div>
                        </form>
                        {
                            showModal && <ModalCode modal={showModal} onHide={() => setShowModal(false)} submitData={handleCreationClick} />
                        }
                        <ToastContainer />
                    </div>
                    :
                    <NewSeed showModal={showModal} setShowModal={setShowModal} />
            }
        </div>
    );
};

export default Home;