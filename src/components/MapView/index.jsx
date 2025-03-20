import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Spinner from 'react-bootstrap/Spinner';

const MapView = ({ lat, lng }) => {
    const {
        VITE_GOOGLE_API_KEY,
    } = import.meta.env;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: VITE_GOOGLE_API_KEY, // 🔹 Reemplaza con tu clave de Google Maps
    });

    if (!isLoaded) return (
        <div style={{ display: "flex", justifyContent: "center", height: "100%", width: "100%" }}>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
        </div>
    );

    return (
        <GoogleMap
            center={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
            zoom={14}
            mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "8px" }}
        >
            <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />
        </GoogleMap>
    );
};

export default MapView;