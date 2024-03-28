# Frog Forum

frontend side of the project, backend elsewhere

## dev notes:

we're using EmilTholin's [Svelte Routing](https://www.npmjs.com/package/svelte-routing). see their readme for usage.

.env file should be at the root of the project. contact dallin for dev keys.

using auth0 and amazon aws s3 for auth and image storage. relevant env vars are: 
- `VITE_AUTH0_DOMAIN`
- `VITE_AUTH0_CLIENT_ID`
- `VITE_SERVER_URL`
- `VITE_AUTH0_AUDIENCE`
- `VITE_AWS_REGION`
- `VITE_AWS_ID_POOL`
- `VITE_AWS_S3_BUCKET`
