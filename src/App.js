import React from 'react';
import s from './App.module.scss';
import CommentList from "./component/CommentList";
import markersList from "./data/markers";
import Map from "./component/Map";

let markers = [];
for (let i=0; i<2; i++) {
    markers.push(markersList[i]);
}

class App extends React.Component{
    state = {
        activeMarker: "",
    };

    changeActiveMarker = (point) => {
        this.setState({
            activeMarker: point,
        })
    };

    render() {
        const { activeMarker } = this.state;
        return (
            <div className="App">
                <div className={s.container}>
                    <Map onMarkerClick={this.changeActiveMarker} activeMarker={activeMarker}/>
                    <CommentList activeComment={activeMarker} commentsList={markers} onCommentClick={this.changeActiveMarker}/>
                </div>
            </div>
        );
    }
}

export default App;
