import React from 'react';
import s from './App.module.scss';
import MapWrapperComponent from "./component/MapWrapperComponent";
import CommentList from "./component/CommentList";


function App() {
  return (
    <div className="App">
        <div className={s.container}>
            <MapWrapperComponent/>
            <CommentList />
        </div>
    </div>
  );
}

export default App;
