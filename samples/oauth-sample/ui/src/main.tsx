import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { DockerMuiThemeProvider } from "@docker/docker-mui-theme";
import { Auth0Provider } from "@auth0/auth0-react";

import { App } from "./App";

const client_id = "Oxuixl3g21aBbJMiWySpjlxUK3qpnUEW";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/*
      If you eject from MUI (which we don't recommend!), you should add
      the `dockerDesktopTheme` class to your root <html> element to get
      some minimal Docker theming.
    */}
    <DockerMuiThemeProvider>
      <Auth0Provider
        domain="login-stage.docker.com"
        clientId={client_id}
        cacheLocation="localstorage"
        authorizationParams={{
          redirect_uri:
            "https://open.docker.com/dashboard/extension-tab?extensionId=docker/sso-sample-extension",
        }}
      >
        <CssBaseline />
        <App />
      </Auth0Provider>
    </DockerMuiThemeProvider>
  </React.StrictMode>
);
