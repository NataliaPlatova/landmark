import React from "react";

import s from "./CurrentLocationMarker.module.scss";


class CurrentLocationMarker extends React.Component {
    render() {
        return(
            <div className={s.marker}>
                <span>+</span>
            </div>
        );
    }
}

export default CurrentLocationMarker;
