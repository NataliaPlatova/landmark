import React from "react";
import {GoogleMap, Marker} from "react-google-maps";

import markersList from "../../data/markers";
import s from "./Map.module.css";

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

    changeCenter = (lat, lng) => {
        console.log(lat, lng);
        this.setState({
            center: {
                lat: lat,
                lng: lng
            },
            zoom: 5
        });
    };

    render() {
        const { center, zoom } = this.state;
        return (
            <GoogleMap
                zoom={zoom}
                center={center}
            >
                {
                    markers.map((marker, id) =>
                        <Marker
                            key={id}
                            id={id}
                            position={{
                                lat: marker.lat,
                                lng: marker.lng
                            }}
                            text={marker.text}
                            onClick={()=>this.changeCenter(marker.lat, marker.lng)}
                        />
                    )
                }
            </GoogleMap>
        );
    }
}


export default Map;
