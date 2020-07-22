import React from 'react';
import s from './App.module.scss';
import MapWrapperComponent from "./component/MapWrapperComponent";
import CommentList from "./component/CommentList";
import markersList from "./data/markers";

let markers = [];
for (let i=0; i<2; i++) {
    markers.push(markersList[i]);
}

function App() {
  return (
    <div className="App">
        <div className={s.container}>
            <MapWrapperComponent/>
            <CommentList commentsList={markers}/>
        </div>
    </div>
  );
}

export default App;
