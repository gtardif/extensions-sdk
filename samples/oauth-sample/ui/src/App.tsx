import React from "react";
import Button from "@mui/material/Button";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { Stack, TextField, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const client = createDockerDesktopClient();

const client_id = "Oxuixl3g21aBbJMiWySpjlxUK3qpnUEW";
const client_secret = "xxxx";

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<string>();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const ddClient = useDockerDesktopClient();

  const queryParams = new URLSearchParams(window.location.search);
  console.log("query: " + queryParams.toString());

  const { isAuthenticated, loginWithRedirect, user, error } = useAuth0();

  console.log("User", user);
  console.log("Error", error);

  return (
    <>
      <Typography variant="h3">Docker extension Oauth demo</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This is a basic page using Oauth to login in using github Oauth as an
        example.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Pressing the below button will trigger a login flow and retrieve a
        github authentication token once the user is authenticated.
      </Typography>
      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="contained"
          onClick={() => loginWithRedirect()}
          disabled={isAuthenticated}
        >
          {isAuthenticated ? "You're looged in" : "Login"}
        </Button>
        <TextField
          label="Oauth response"
          sx={{ width: 480 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={response ?? ""}
        />
      </Stack>
    </>
  );
}
