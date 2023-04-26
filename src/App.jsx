import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./Home";

const oktaConfig = {
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  redirectUri: `${window.location.origin}/implicit/callback`,
  scopes: ["openid", "profile", "email"],
  pkce: false,
  tokenManager: {
    expireEarlySeconds: 3570,
  },
};

const oktaAuth = new OktaAuth(oktaConfig);

const App = () => {
  const history = useHistory();

  const triggerLogin = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={triggerLogin}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Switch>
        <Route path="/implicit/callback" component={LoginCallback} />
        <SecureRoute path="/" component={Home} />
      </Switch>
    </Security>
  );
};

export default App;
