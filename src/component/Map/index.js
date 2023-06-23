import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

import s from "./Map.module.scss";
import { shallowEqual, useSelector } from "react-redux";

const Map = (props) => {
    const { activeMarker, onMarkerClick, myPoint } = props;
    const markersList = useSelector(
        (state) =>
            state.comments.comments.map((comment) => {
                return {
                    id: comment.id,
                    lat: comment.address.geo.lat,
                    lng: comment.address.geo.lng,
                };
            }),
        shallowEqual,
    );

    const [coords, setCoords] = useState({
        defaultCenter: {},
        center: {},
        zoom: 7,
    });

    useEffect(() => {
        if (myPoint !== coords.myPoint) {
            setCoords({
                defaultCenter: {
                    lat: Number(myPoint.lat),
                    lng: Number(myPoint.lng),
                },
                center: {
                    lat: Number(myPoint.lat),
                    lng: Number(myPoint.lng),
                },
                zoom: coords.zoom,
            });
        }
        if (!!activeMarker) {
            changeCenter(Number(activeMarker.lat), Number(activeMarker.lng));
        }
    }, [myPoint.lat, myPoint.lng, activeMarker]);

    const changeCenter = (lat, lng) => {
        setCoords({
            defaultCenter: coords.defaultCenter,
            center: {
                lat,
                lng,
            },
            zoom: 5,
        });
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyCrbZ4ks0emyqNNIJtEYyODwQKsURONkog">
            <GoogleMap
                zoom={coords.zoom}
                defaultCenter={coords.defaultCenter}
                center={coords.center}
                mapContainerClassName={s.mapContainer}
                sensor={false}
            >
                <Marker
                    onClick={() => {
                        changeCenter(coords.defaultCenter.lat, coords.defaultCenter.lng);
                    }}
                    position={{
                        lat: parseFloat(coords.defaultCenter.lat),
                        lng: parseFloat(coords.defaultCenter.lng),
                    }}
                />
                {markersList.map((marker) => (
                    <Marker
                        key={marker.id}
                        id={marker.id}
                        position={{
                            lat: parseFloat(marker.lat),
                            lng: parseFloat(marker.lng),
                        }}
                        onClick={() => {
                            onMarkerClick(marker);
                            changeCenter(parseFloat(marker.lat), parseFloat(marker.lng));
                        }}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
