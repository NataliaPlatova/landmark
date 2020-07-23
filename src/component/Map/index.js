import React from "react";
import {GoogleMap, Marker, LoadScript} from "@react-google-maps/api";

import s from "./Map.module.scss";


class Map extends React.Component {
    state = {
        defaultCenter: {},
        center: {},
        zoom: 7
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                defaultCenter: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                zoom: this.state.zoom,
            })
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeMarker !== this.props.activeMarker) {
            this.changeCenter(this.props.activeMarker.lat, this.props.activeMarker.lng)
        }
    }

    changeCenter = (lat, lng) => {
        this.setState({
            defaultCenter: this.state.defaultCenter,
            center: {
                lat,
                lng
            },
            zoom: 5
        });
    };

    render() {
        const { defaultCenter, center, zoom } = this.state;
        const { activeMarker, onMarkerClick, markersList, openFormHandler } = this.props;
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyAemEnOiurLbBg2C1a9YraNw95Uay-R6U8"
            >
                <GoogleMap
                    zoom={zoom}
                    defaultCenter={defaultCenter}
                    center={center}
                    mapContainerClassName={s.mapContainer}
                >
                    <Marker
                        onClick={()=>{
                            openFormHandler();
                            this.changeCenter(defaultCenter.lat, defaultCenter.lng);
                        }}
                         position={{lat: defaultCenter.lat, lng: defaultCenter.lng}}
                    icon={{
                        url: "https://raw.githubusercontent.com/NataliaPlatova/landmark/master/src/img/Pin.png"
                    }}/>
                    {
                        markersList.map((marker) =>
                            <Marker
                                key={marker.id}
                                id={marker.id}
                                position={{
                                    lat: marker.lat,
                                    lng: marker.lng
                                }}
                                onClick={()=>{
                                    onMarkerClick(marker);
                                    this.changeCenter(marker.lat, marker.lng);
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
