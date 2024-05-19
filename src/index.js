import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import reducer from "./reducers";
import middleware from "./middleware";
import { createStore } from "redux";

const container = document.getElementById('root');
const root = createRoot(container);
const store = createStore(reducer, middleware);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);