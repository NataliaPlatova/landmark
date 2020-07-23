import React from 'react';
import s from './App.module.scss';
import HomePage from "./pages/HomePage";
import CookiesProvider from "react-cookie/cjs/CookiesProvider";

const App = () => {
    return (
        <div className="App">
            <CookiesProvider>
                <HomePage/>
            </CookiesProvider>
        </div>
        );
}

export default App;
