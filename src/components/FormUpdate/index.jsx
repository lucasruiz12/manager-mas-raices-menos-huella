import React, { useState } from 'react';
import Papa from 'papaparse'; // Asegúrate de instalar papaparse con `npm install papaparse`
import { toast, ToastContainer } from 'react-toastify';
import connections from '../../connections';
import ModalCode from '../ModalCode';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const FormUpdate = ({ showModal, setShowModal }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    // Validación del contenido del archivo CSV
    const validateCSV = (data) => {
        const requiredColumns = ["ID ticket", "Estado", "Resolucion"];
        const errors = [];

        // Validar columnas
        const columns = data[0];
        const missingColumns = requiredColumns.filter((col) => !columns.includes(col));
        if (missingColumns.length > 0) {
            errors.push(`Faltan las columnas: ${missingColumns.join(", ")}`);
        }

        // Validar filas
        data.slice(1).forEach((row, index) => {
            const estadoIndex = columns.indexOf("Estado");
            const resolucionIndex = columns.indexOf("Resolucion");
            if (row[estadoIndex] === "Resuelto" && (!row[resolucionIndex] || row[resolucionIndex].trim() === "")) {
                errors.push(`Error en la fila ${index + 2}: "Estado" es "Resuelto" pero "Resolucion" está vacío.`);
            }
        });

        return errors;
    };

    // Handler para seleccionar archivo
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/csv") {
            Papa.parse(file, {
                complete: (result) => {
                    const rows = result.data;

                    if (rows.length > 200) {
                        toast.error("El archivo excede el límite máximo de 200 registros. Por favor, ajuste el contenido.", { autoClose: 4000 });
                        setSelectedFile(null);
                        document.getElementById('csvFile').value = '';
                        return;
                    };

                    const errors = validateCSV(result.data);
                    if (errors.length > 0) {
                        toast.error(errors.join(" "), { autoClose: 4000 });
                        setSelectedFile(null);
                        document.getElementById('csvFile').value = '';
                    } else {
                        setSelectedFile(file);
                        toast.success("Archivo cargado correctamente", { autoClose: 2000 });
                    }
                },
                error: () => {
                    toast.error("Error al procesar el archivo CSV", { autoClose: 2000 });
                },
                skipEmptyLines: true,
            });
        } else {
            toast.error("Solo se permiten archivos CSV", { autoClose: 2000 });
        }
    };

    // Handler para eliminar el archivo seleccionado
    const handleRemoveFile = () => {
        setSelectedFile(null);
        document.getElementById('csvFile').value = '';
        toast.info("Archivo eliminado", { autoClose: 2000 });
    };

    // Handler para subir el archivo a la API
    const handleUpload = async () => {

        const validation = JSON.parse(localStorage.getItem("validationUpdate"));
        const now = new Date();
        const confirmationDate = now.toLocaleDateString();

        if (validation !== confirmationDate) {

            if (!selectedFile) {
                toast.warning("Por favor, seleccione un archivo antes de continuar", { autoClose: 2000 });
                return;
            };

            const formData = new FormData();
            formData.append('filetickets', selectedFile);

            try {
                toast.info("Cargando datos. Aguarde unos segundos.", { autoClose: 2000 })
                const genToken = await connections.genTokenZoho();
                const tokenZoho = await genToken.data.data.auth_token;

                const response = await connections.uploadData(tokenZoho, formData);

                if (response.data.success) {
                    localStorage.setItem("validationUpdate", JSON.stringify(confirmationDate));
                    toast.success("Base de datos actualizada correctamente", { autoClose: 2000 });
                    document.getElementById('csvFile').value = '';
                    setSelectedFile(null);
                } else {
                    throw new Error("Error en la actualización");
                };
            } catch (error) {
                console.error(error);
                toast.error("Error al actualizar la base de datos", { autoClose: 2000 });
            }
        } else {
            toast.error("Ya realizaste tu carga diaria. Intenta nuevamente mañana", { autoClose: 2000 });
        }
    };

    // Handler para descargar el modelo de CSV
    const handleDownloadTemplate = () => {
        const link = document.createElement('a');
        link.href = '/assets/FORMATO_PARA_CREAR_CSV.xlsx';
        link.download = 'FORMATO_PARA_CREAR_CSV.xlsx';
        link.click();
        toast.info("Plantilla descargada", { autoClose: 2000 });
    };

    return (
        <div className="container p-4 container-update">
            <h2 className="mb-4">Actualizar Base de Datos</h2>
            <div className="mb-3">
                <label htmlFor="csvFile" className="form-label">Seleccione un archivo CSV</label>
                <input
                    type="file"
                    id="csvFile"
                    className="form-control"
                    accept=".csv"
                    onChange={handleFileChange}
                />
                {selectedFile && (
                    <div className="mt-3">
                        <p><strong>Archivo seleccionado:</strong> {selectedFile.name}</p>
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={handleRemoveFile}
                        >
                            Eliminar archivo
                        </button>
                    </div>
                )}
            </div>

            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>
                <button
                    type="button"
                    style={{ width: "50%" }}
                    className="btn btn-primary me-2"
                    onClick={() => setShowModal(true)}
                    disabled={!selectedFile}
                >
                    Subir y Actualizar
                </button>
            </div>
            <p
                className="text-download"
                onClick={handleDownloadTemplate}
            >
                Descargar archivo de ejemplo (formato CSV) para cargar los datos correctamente
            </p>

            {
                showModal && <ModalCode modal={showModal} onHide={() => setShowModal(false)} submitData={handleUpload} />
            }

            <ToastContainer />
        </div>
    );
};

export default FormUpdate;
