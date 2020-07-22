import React from "react";
import {withScriptjs, withGoogleMap} from "react-google-maps";
import Map from "../Map";

import s from "./MapWrapperComponent.module.css";

const WrappedMap = withScriptjs(withGoogleMap(Map));

function MapWrapperComponent() {
    return(
        <div className={s.wrapper}>
            <WrappedMap
                googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAemEnOiurLbBg2C1a9YraNw95Uay-R6U8"}
                loadingElement={<div style={{height: "100%"}}/> }
                containerElement={<div style={{height: "100%"}}/> }
                mapElement={<div style={{height: "100%"}}/> }

            />
        </div>
    );
};

export default MapWrapperComponent;
