import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Modal, Button } from 'react-bootstrap';
import { validateCoordinates } from '../../helpers/functions';
import MapView from '../MapView';

const ModalPreview = ({ modal, dataToSearch, onHide, submitData }) => {

    const [loading, setLoading] = useState(true);
    const [checkedData, setCheckedData] = useState(false);

    const handleConfirm = () => {
        submitData();  // Ejecutar la función pasada desde el componente principal
        onHide();     // Cerrar el modal
    };

    useEffect(() => {
        const checkCoordinates = validateCoordinates(dataToSearch.google_coordinates_lat, dataToSearch.google_coordinates_lng);
        setCheckedData(checkCoordinates);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <Modal
            show={modal}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header>
                <Modal.Title>Previsualización en mapa</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: "30vh" }}>
                {
                    loading ?
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "30vh" }}>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </div>
                        :
                        checkedData ?
                            <div>
                                <p>Esta es la ubicación de tu semilla</p>
                                <MapView lat={dataToSearch.google_coordinates_lat} lng={dataToSearch.google_coordinates_lng} />
                            </div>
                            :
                            <p>Las coordenadas ingresadas no son válidas</p>
                }
            </Modal.Body>
            {
                !loading &&
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        {checkedData ? "Cancelar" : "Salir"}
                    </Button>
                    {
                        checkedData &&
                        <Button variant="success" onClick={handleConfirm}>
                            Confirmar semilla
                        </Button>
                    }
                </Modal.Footer>
            }
        </Modal>
    );
};

export default ModalPreview;
