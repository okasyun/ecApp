import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./reducks/store/store";
import * as History from "history";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./assets/theme";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConnectedRouter } from "connected-react-router";

// 第一引数のコンポーネントを第二引数のセレクターに実行する
const history = History.createBrowserHistory();
export const store = createStore(history);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
