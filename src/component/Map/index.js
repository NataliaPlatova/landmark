import React from "react";
import {GoogleMap, Marker, LoadScript} from "@react-google-maps/api";

import markersList from "../../data/markers";
import s from "./Map.module.scss";

let markers = [];
for (let i=0; i<2; i++) {
    markers.push(markersList[i]);
}

class Map extends React.Component {
    state = {
        center: {
            lat: 45,
            lng: 75
        },
        zoom: 3
    };

    changeCenter = (point) => {
        this.setState({
            center: {
                lat: point.lat,
                lng: point.lng
            },
            zoom: 5
        });
    };

    render() {
        const { center, zoom } = this.state;
        const { onMarkerClick } = this.props;

        return (
            <LoadScript
                googleMapsApiKey="AIzaSyAemEnOiurLbBg2C1a9YraNw95Uay-R6U8"
            >
                <GoogleMap
                    zoom={zoom}
                    center={center}
                    mapContainerStyle={ {width: "100%", height: "100vh" } }
                >
                    {
                        markers.map((marker) =>
                            <Marker
                                key={marker.id}
                                id={marker.id}
                                position={{
                                    lat: marker.lat,
                                    lng: marker.lng
                                }}
                                text={marker.text}
                                onClick={()=>{
                                    onMarkerClick(marker);
                                    this.changeCenter(marker);
                                }}
                            />
                        )
                    }
                </GoogleMap>
            </LoadScript>
        );
    }
}


export default Map;
