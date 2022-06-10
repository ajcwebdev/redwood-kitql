# RedwoodJS and KitQL

## Redwood API

Install dependencies and run only the Redwood `api` side on `localhost:8911`:

```bash
yarn
yarn rw dev api
```

Test the endpoint on [localhost:8911/graphql](http://localhost:8911/graphql) or run the following `curl` command:

```bash
curl 'http://localhost:8911/graphql' \
  --header 'content-type: application/json' \
  --data '{"query":"{ redwood { version currentUser prismaVersion } }"}'
```

Copy the contents of `.env.example` and create a new `.env` file.

```bash
cp .env.example .env
```

The Redwood API endpoint (`http://localhost:8911/graphql`) is set to an environment variable (`VITE_REDWOOD_API_ENDPOINT`).

### Start KitQL

Keep your first terminal running, open another and navigate into the `svelte` directory. Install dependencies and run the development server on `localhost:3000`.

```bash
cd svelte
yarn
yarn start
```

Open [localhost:3000](http://localhost:3000) to see the frontend querying the Redwood version from the API.

<img alt="Redwood Version 1 KitQL Query" src="https://user-images.githubusercontent.com/12433465/173026556-d3d2e9f6-16a4-4eb3-a043-d6a746574d36.png">