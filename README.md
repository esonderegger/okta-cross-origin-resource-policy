# okta-cross-origin-resource-policy

Minimal site to demonstrate Cross-Origin-Resource-Policy issue

## The goal: a SPA with cross-origin isolation

In order for a site to enable [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer), it has to be [crossOriginIsolated](https://developer.mozilla.org/en-US/docs/Web/API/crossOriginIsolated). In order to do this, it needs to be in a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts). It also needs to have these two headers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

However, if the site is using [Okta OpenID Connect](https://www.okta.com/openid-connect/) for authentication, this creates a challenge. Specifically:

> Because your site has the Cross-Origin Embedder Policy (COEP) enabled, each resource must specify a suitable Cross-Origin Resource Policy (CORP). This behavior prevents a document from loading cross-origin resources which don’t explicitly grant permission to be loaded.

## Running this site locally

In order to run this demo, you will need:

- A recent version onf Node.js installed
- An Okta application, with a client ID
- A sign-in redirect URI in your application

Once, you have your Okta application, create a `.env` file in the root of this project with the following variables:

```
REACT_APP_OKTA_ISSUER=https://my-company.okta.com
REACT_APP_OKTA_CLIENT_ID=<application_client_id>
```

Then, create a sign-in redirect UID in the Okta admin page for:

```
http://localhost:3000/implicit/callback
```

Next, install the javascript dependencies:

```
npm install
```

Finally, start the development server:

```
npm run start
```

## Questions

- Does this problem go away if we use PKCE instead of the implicit flow?
- Does the `content-security-policy` header on the `/oauth/v1/authorize` endpoint matter? If so, how do we add an origin to it?
- Are there other ways to enable cross-origin isolation on an OIDC application?
