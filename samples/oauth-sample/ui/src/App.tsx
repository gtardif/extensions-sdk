import React from "react";
import Button from "@mui/material/Button";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { Stack, TextField, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<string>();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const ddClient = useDockerDesktopClient();

  const queryParams = new URLSearchParams(window.location.search);
  console.log("query: " + queryParams.toString());

  const { isAuthenticated, loginWithRedirect, logout, user, error } =
    useAuth0();

  console.log("User", user);
  console.log("Error", error);

  console.log("loading: window.location", window.location);

  return (
    <>
      <Typography variant="h3">Docker extension Oauth demo</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This is a basic extension using Oauth to login with Docker auth
        provider.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Pressing the below button will trigger a login flow againts Docker hub.
      </Typography>
      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="contained"
          onClick={() => {
            isAuthenticated
              ? logout()
              : loginWithRedirect({ openUrl: ddClient.host.openExternal });
          }}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </Button>
        <TextField
          label={isAuthenticated ? "logged in" : "not logged in yet"}
          sx={{ width: 480 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={user ? user?.name + " - " + user?.email : ""}
        />
        {user?.picture && <img src={user?.picture} width="100" height="100" />}
      </Stack>
    </>
  );
}
