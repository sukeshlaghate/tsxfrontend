/// <reference path="./index.d.ts" />
import * as React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import GeoCardModel from "./models/geocardmodel";
import { Provider } from "mobx-react";
import menuStore from "./stores/menustore";
import App from "./app";

const cardModel = new GeoCardModel("cardModel");
const stores = {
  menuStore,
  cardModel
};
//image={"https://react.semantic-ui.com/assets/images/avatar/large/matthew.png"

// For easier debugging check how to set the window object property 
//window._____APP_STATE_____ = stores;

render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);