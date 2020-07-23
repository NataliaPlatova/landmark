import React from "react";
import {GoogleMap, Marker, LoadScript} from "@react-google-maps/api";

import s from "./Map.module.scss";


class Map extends React.Component {
    state = {
        defaultCenter: {},
        center: {},
        zoom: 7
    };

    componentDidUpdate(prevProps) {
        if(prevProps.myPoint !== this.props.myPoint) {
            this.setState({
                defaultCenter: {
                    lat: this.props.myPoint.lat,
                    lng: this.props.myPoint.lng
                },
                center: {
                    lat: this.props.myPoint.lat,
                    lng: this.props.myPoint.lng
                },
                zoom: this.state.zoom,
            },);
        }
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
        const { activeMarker, onMarkerClick, markersList, myPoint } = this.props;
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
                            this.changeCenter(defaultCenter.lat, defaultCenter.lng);
                        }}
                         position={{lat: defaultCenter.lat, lng: defaultCenter.lng}}
                    />
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
