import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";

// const root =  ;//.createRoot(document.getElementById('root'));/
if (document.getElementById('root')) {
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,
        document.getElementById('root'));
}
