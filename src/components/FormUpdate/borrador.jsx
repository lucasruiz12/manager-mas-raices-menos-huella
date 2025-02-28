{/* <div className="container p-4 form-container">
    <form className="form-search">
        <h2 className="mb-4" style={{ display: "flex", justifyContent: "center" }}>Administrador de notificaciones</h2>
        <div className="mb-3">
            <label htmlFor="site" className="form-label">Usuarios</label>
            <input
                type="text"
                id="site"
                name="site"
                value={inputValue}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Buscar puntos tácticos"
                onFocus={() => dataToSearch.interval !== 9 && setShowDropdown(true)}
            // disabled={dataToSearch.interval === 9}
            />
            {showDropdown && dataToSearch.interval !== 9 && (
                <ul className="menu-desp">
                    {filteredClients.length > 0 ? (
                        filteredClients.map(client => {
                            return (
                                <li key={client.id} onClick={() => handleClientSelect(client.name)}>
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
        <div style={{ display: "flex", justifyContent: "center" }}>
            <button
                type="button"
                className="btn btn-primary btn-download-csv"
                // onClick={() => setShowModal(true)}
                onClick={() => handleDownloadClick()}
                disabled={((dataToSearch.interval === 3 && dateToFilter === "") || downloadInProgress)}
            >
                {
                    downloadInProgress ?
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        :
                        "DESCARGAR CSV"
                }
            </button>
        </div>
    </form>
    {
        showModal && <ModalCode modal={showModal} onHide={() => setShowModal(false)} submitData={handleDownloadClick} />
    }
    <ToastContainer />
</div> */}