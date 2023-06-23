import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

import s from "./Map.module.scss";

class Map extends React.Component {
    state = {
        defaultCenter: {},
        center: {},
        zoom: 7,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.myPoint !== this.props.myPoint) {
            this.setState({
                defaultCenter: {
                    lat: Number(this.props.myPoint.lat),
                    lng: Number(this.props.myPoint.lng),
                },
                center: {
                    lat: Number(this.props.myPoint.lat),
                    lng: Number(this.props.myPoint.lng),
                },
                zoom: this.state.zoom,
            });
        }
        if (prevProps.activeMarker !== this.props.activeMarker) {
            this.changeCenter(
                Number(this.props.activeMarker.address.geo.lat),
                Number(this.props.activeMarker.address.geo.lng),
            );
        }
    }

    changeCenter = (lat, lng) => {
        this.setState({
            defaultCenter: this.state.defaultCenter,
            center: {
                lat,
                lng,
            },
            zoom: 5,
        });
    };

    render() {
        const { defaultCenter, center, zoom } = this.state;
        const { activeMarker, onMarkerClick, /*markersList,*/ myPoint } = this.props;
        return (
            <LoadScript googleMapsApiKey="AIzaSyCrbZ4ks0emyqNNIJtEYyODwQKsURONkog">
                <GoogleMap
                    zoom={zoom}
                    defaultCenter={defaultCenter}
                    center={center}
                    mapContainerClassName={s.mapContainer}
                    sensor={false}
                >
                    <Marker
                        onClick={() => {
                            this.changeCenter(defaultCenter.lat, defaultCenter.lng);
                        }}
                        position={{
                            lat: parseFloat(defaultCenter.lat),
                            lng: parseFloat(defaultCenter.lng),
                        }}
                    />
                    {/*markersList.map((marker) =>
                            <Marker
                                key={marker.id}
                                id={marker.id}
                                position={{
                                    lat: parseFloat(marker.address.geo.lat),
                                    lng: parseFloat(marker.address.geo.lng)
                                }}
                                onClick={()=>{
                                    onMarkerClick(marker);
                                    this.changeCenter(parseFloat(marker.address.geo.lat), parseFloat(marker.address.geo.lng));
                                }}
                            />
                        )*/}
                </GoogleMap>
            </LoadScript>
        );
    }
}

export default Map;
