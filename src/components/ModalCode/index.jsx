import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalCode = ({ modal, onHide, submitData }) => {
    const [operatorCode, setOperatorCode] = useState('');
    const [error, setError] = useState('');

    const handleConfirm = () => {
        if (operatorCode === '1234') {
            submitData();  // Ejecutar la función pasada desde el componente principal
            onHide();     // Cerrar el modal
        } else {
            setError('Código incorrecto. Por favor, inténtelo nuevamente.');
        };
    };

    useEffect(() => {
        if(error){
            setError("");
        };
    }, [operatorCode]);

    return (
        <Modal
            show={modal}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirmación requerida</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Ingrese su código de administrador para confirmar la acción:</p>
                <Form.Control
                    type="password"
                    value={operatorCode}
                    onChange={(e) => setOperatorCode(e.target.value)}
                    placeholder="Código de administrador"
                />
                {error && <p className="text-danger mt-2">{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleConfirm}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCode;
