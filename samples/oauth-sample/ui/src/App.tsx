import React from "react";
import Button from "@mui/material/Button";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { Stack, TextField, Typography } from "@mui/material";

const client = createDockerDesktopClient();

const client_id = "Oxuixl3g21aBbJMiWySpjlxUK3qpnUEW";
const client_secret = "xxxx";

function useDockerDesktopClient() {
  return client;
}

/*
function base64URLEncode(str: any) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}
const verifier = base64URLEncode(crypto.lib.WordArray.random(32));

function sha256(buffer: any) {
  return crypto.createHash("sha256").update(buffer).digest();
}
const challenge = base64URLEncode(sha256(verifier));
*/

function randomCode(): string {
  let array = new Uint8Array(64);
  array = globalThis.crypto.getRandomValues(array);
  return String.fromCharCode.apply(null, Array.from(array));
}

function base64URLEncode(str: string): string {
  const b64 = btoa(str);
  const encoded = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return encoded;
}

const verifier = base64URLEncode(randomCode());

const bufferToBase64UrlEncoded = (hash: ArrayBuffer): string => {
  const uintArray = new Uint8Array(hash);
  const numberArray = Array.from(uintArray);
  const hashString = String.fromCharCode(...numberArray);
  return urlEncodeB64(btoa(hashString));
};

const urlEncodeB64 = (input: string) => {
  const b64Chars: { [index: string]: string } = { "+": "-", "/": "_", "=": "" };
  return input.replace(/[+/=]/g, (m: string) => b64Chars[m]);
};

const sha256 = async (str: string): Promise<string> => {
  const digestOp = await crypto.subtle.digest(
    { name: "SHA-256" },
    new TextEncoder().encode(str)
  );
  return bufferToBase64UrlEncoded(digestOp);
};

const redirectUri =
  "https%3A%2F%2Fopen.docker.com%2Fdashboard%2Fextension-tab%3FextensionId%3Ddocker%2Fsso-sample-extension";

export function App() {
  const [response, setResponse] = React.useState<string>();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const ddClient = useDockerDesktopClient();

  const queryParams = new URLSearchParams(window.location.search);
  console.log("query: " + queryParams.toString());

  if (!loggedIn && queryParams.get("code")) {
    console.log("processing POST with code " + queryParams.get("code"));
    const requestOptions = {
      method: "POST",
      Headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const tokenRequest = `https://login-stage.docker.com/oauth/token?client_id=${client_id}&code_verifier=${verifier}&grant_type=authorization_code&code=${queryParams.get(
      "code"
    )}&redirect_uri=${redirectUri}`;
    console.log("tokenRequest: ", tokenRequest);
    fetch(tokenRequest, requestOptions)
      .then((response) => {
        console.log("response: " + response);
        return response.text();
      })
      .then((data) => {
        console.log("data: " + data);
        setLoggedIn(true);
        setResponse(data);
      });
  }

  const login = async () => {
    const challenge = await sha256(verifier);

    console.log("challenge: ", challenge);
    console.log("verifier: ", verifier);

    ddClient.host.openExternal(
      `https://login-stage.docker.com/oauth/authorize?client_id=${client_id}&code_challenge=${challenge}&code_challenge_method=S256&response_type=code&response_mode=query&redirect_uri=${redirectUri}`
    );
  };

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
        <Button variant="contained" onClick={login} disabled={loggedIn}>
          {loggedIn ? "You're looged in" : "Login"}
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
