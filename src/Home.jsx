import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";

export default function Home() {
  const { authState } = useOktaAuth();
  const [err, setErr] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setErr("Attempted to load Home without an authenticated user.");
    } else {
      const { name } = authState.idToken.claims;
      setName(name);
    }
  }, [authState]);

  if (err) {
    return <div>{err}</div>;
  }

  if (!name) {
    return <div>Loading</div>;
  }

  return <div>Hello {name}!</div>;
}
