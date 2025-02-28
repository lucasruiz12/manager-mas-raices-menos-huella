import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import connections from '../../connections';
import DatePicker from 'react-datepicker';
import Navbar from '../../components/Navbar';
import FormUpdate from '../../components/FormUpdate';
import ModalCode from '../../components/ModalCode';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { IS_AUTHENTICATED } from '../../constants';

const Home = () => {
    const [newNotification, setNewNotification] = useState({
        title: "",
        body: "",
        timestamp: "",
    })

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




        // setInputValue(value);
        // setFilteredClients(
        //     clients.filter(client =>
        //         client.name.toLowerCase().includes(value.toLowerCase())
        //     )
        // );
        // setShowDropdown(true);
    };

    const handleCreationClick = () => {
        // console.log("VAMOS A DESPACHAR", newNotification);
        setCreationInProgress(true);

        setTimeout(() => {
            setNewNotification({
                title: "",
                body: "",
                timestamp: "",
            });
            setCreationInProgress(false);
        }, 1500);
    };

    // const handleError = (err) => {
    //     setTimeout(() => {
    //         setDataToSearch({ site: "", interval: 9 });
    //         setInputValue("");
    //         setDateToFilter("");
    //         if (err?.status === 404) {
    //             toast.warning("No hay datos disponibles", { autoClose: 2000 });
    //             setCreationInProgress(false);
    //         } else {
    //             toast.error("¡Error! Reintente o comuníquese con soporte", { autoClose: 2000 });
    //             setCreationInProgress(false);
    //         }
    //     }, 1000);
    //     console.error(err);
    // };

    // const handleDateChange = (date) => {
    //     setDateToFilter(date);
    //     console.log(date);
    // };

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem(IS_AUTHENTICATED))?.id) {
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
                                // onFocus={() => dataToSearch.interval !== 9 && setShowDropdown(true)}
                                // disabled={dataToSearch.interval === 9}
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
                                // onFocus={() => dataToSearch.interval !== 9 && setShowDropdown(true)}
                                // disabled={dataToSearch.interval === 9}
                                />
                                <label htmlFor="specificDay" className="form-label mt-4">Día y hora</label>
                                <div className="form-control">
                                    <DatePicker
                                        selected={newNotification.timestamp}
                                        onChange={handleInputChange}
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        timeFormat="HH:mm"
                                        minDate={new Date()}
                                        // maxTime={new Date().setHours(23, 30)}
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
                                    // onClick={() => setShowModal(true)}
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
                    <FormUpdate showModal={showModal} setShowModal={setShowModal} />
            }
        </div>
    );
};

export default Home;