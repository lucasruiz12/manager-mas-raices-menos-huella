import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import connections from '../../connections';
import Spinner from 'react-bootstrap/Spinner';
import ModalPreview from '../ModalPreview';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const NewSeed = () => {

    const [inputValue, setInputValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
    const [creationInProgress, setCreationInProgress] = useState(false);
    const [filteredClients, setFilteredClients] = useState([]);
    const [allClients, setAllClients] = useState([]);
    const [dataToSearch, setDataToSearch] = useState({
        user_id: "",
        google_coordinates_lat: "",
        google_coordinates_lng: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === "user") {
            setInputValue(value);
            if (value === "") {
                setDataToSearch({
                    ...dataToSearch,
                    user_id: ""
                });
                setShowDropdown(false);
                setFilteredClients(allClients);
            } else {
                setFilteredClients(
                    allClients.filter(client =>
                        client.name.toLowerCase().includes(value.toLowerCase())
                    )
                );
                setShowDropdown(true);
            }
        } else {
            setDataToSearch({
                ...dataToSearch,
                [name]: value,
            });
        };
    };

    const handleClientSelect = (userName, user_id) => {
        setDataToSearch((prevData) => ({ ...prevData, user_id }));
        setInputValue(userName);

        setFilteredClients(
            allClients.filter(client =>
                client.name.toLowerCase().includes(userName.toLowerCase())
            )
        );

        setShowDropdown(false);
    };

    const handleSubmit = () => {
        setCreationInProgress(true);
        connections.createSeed(dataToSearch).then(response => {
            if (response.data.success) {
                setTimeout(() => {
                    toast.success("Semilla creada correctamente", { autoClose: 2000 });
                    setInputValue("");
                    setDataToSearch({
                        user_id: "",
                        google_coordinates_lat: "",
                        google_coordinates_lng: "",
                    });
                    setFilteredClients(allClients);
                    setCreationInProgress(false);
                }, 1500);
            } else {
                toast.warning("No se pudo crear la semilla. Revise los campos", { autoClose: 2000 });
            };
        })
            .catch(err => {
                setTimeout(() => {
                    toast.error("Error al crear semilla. Revise datos", { autoClose: 2000 });
                    console.error("Error al crear semilla", err);
                    setCreationInProgress(false);
                }, 1000);
            });
    };

    useEffect(() => {
        connections.getUsers().then(response => {
            if (response.data.success) {
                setFilteredClients(response.data.data);
                setAllClients(response.data.data);
            };
        })
            .catch(err => console.error("Error al obtener usuarios", err));
    }, []);

    return (
        <div className="container p-4 container-update">
            <form className="form-update">
                <h2 className="mb-4" style={{ display: "flex", justifyContent: "center" }}>Administrador de semillas</h2>
                <div className="mb-3">
                    <label htmlFor="user" className="form-label">Usuario</label>
                    <input
                        type="text"
                        id="user"
                        name="user"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Buscar usuario"
                        onFocus={() => setShowDropdown(true)}
                    />
                    {showDropdown && (
                        <ul className="menu-desp">
                            {filteredClients.length > 0 ? (
                                filteredClients.map(client => {
                                    return (
                                        <li key={client.id} onClick={() => handleClientSelect(client.name, client.id)}>
                                            {client.name}
                                        </li>
                                    )
                                })
                            ) : (
                                <li>No se encontraron coincidencias</li>
                            )}
                        </ul>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="google_coordinates_lat" className="form-label">Latitud</label>
                    <input
                        type="text"
                        id="google_coordinates_lat"
                        name="google_coordinates_lat"
                        value={dataToSearch.google_coordinates_lat}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Ingrese latitud"
                        onFocus={() => setShowDropdown(false)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="google_coordinates_lng" className="form-label">Longitud</label>
                    <input
                        type="text"
                        id="google_coordinates_lng"
                        name="google_coordinates_lng"
                        value={dataToSearch.google_coordinates_lng}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Ingrese longitud"
                        onFocus={() => setShowDropdown(false)}
                    />
                </div>

                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>
                    <button
                        type="button"
                        style={{ width: "50%" }}
                        className="btn btn-success me-2 btn-download-csv"
                        onClick={() => setPreviewModal(true)}
                        disabled={
                            dataToSearch.user_id === "" ||
                            dataToSearch.google_coordinates_lat === "" ||
                            dataToSearch.google_coordinates_lng === "" ||
                            creationInProgress
                        }
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
                                "PREVISUALIZAR EN MAPA"
                        }
                    </button>
                </div>
            </form>

            {
                previewModal && <ModalPreview modal={previewModal} dataToSearch={dataToSearch} onHide={() => setPreviewModal(false)} submitData={handleSubmit} />
            }

            <ToastContainer />
        </div>
    );
};

export default NewSeed;
