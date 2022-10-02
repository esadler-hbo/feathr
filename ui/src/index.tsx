import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "antd/dist/antd.min.css";
import "./index.less";
import "./site.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
              <QueryClientProvider client={queryClient}>
                <BrowserRouter>
        <App />
                 </BrowserRouter>
              </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
