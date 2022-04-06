# How to Query the Redwood API with SvelteKit

Cause sometimes you're just like, "React...? Nah."

## Create Redwood App and Start API Server

Create a boilerplate Redwood application and start the development server on the `api` side only.

```bash
yarn create redwood-app redwood-sveltekit
cd redwood-sveltekit
yarn rw setup deploy netlify
yarn rw dev api
```

Leave the API running and open another terminal to send a `curl` command to the GraphQL API with a GraphQL query asking for the Redwood version number of the project.

```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'localhost:8911/graphql' \
  --data '{"query":"{ redwood { version } }"}'
```

Alternatively you can open [localhost:8911/graphql](http://localhost:8911/graphql) and send a GraphQL query through the GraphQL Yoga GraphiQL editor.

## Create SvelteKit Side

Create a `svelte` directory with `src/routes` nested inside and initialize a `package.json` file.

```bash
mkdir -p svelte/src/routes
cd svelte
yarn init -y
```

Open the `package.json` file in the `svelte` directory and add `module` for the `type` along with the following scripts:

```json
{
  "name": "svelte",
  "packageManager": "yarn@3.2.0",
  "type": "module",
  "scripts": {
    "dev": "svelte-kit dev",
    "build": "svelte-kit build",
    "package": "svelte-kit package",
    "preview": "svelte-kit preview",
    "prepare": "svelte-kit sync"
  }
}
```

Create project files and install dependencies.

```bash
touch yarn.lock svelte.config.js netlify.toml src/app.html \
  src/routes/index.svelte src/routes/graphql.js
yarn add -D dotenv svelte @sveltejs/kit @sveltejs/adapter-netlify@next
```

Create a `.env` file with our Redwood API endpoint and a `.gitignore` file.

```bash
echo 'REDWOOD_API_ENDPOINT=http://localhost:8911/graphql' > .env
echo 'build\n.svelte-kit' > .gitignore
```

### Svelte Configuration File

Add the following to `svelte.config.js`

```js
// svelte/svelte.config.js

import adapter from '@sveltejs/adapter-netlify'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
}

export default config
```

```html
<!-- svelte/src/routes/index.svelte -->

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="description" content="An example RedwoodJS application with a SvelteKit frontend" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%svelte.head%
	</head>
	<body>
		<div>%svelte.body%</div>
	</body>
</html>
```

```js
// web/src/routes/graphql.js

import 'dotenv/config'

const { REDWOOD_API_ENDPOINT } = process.env

export async function post() {
  const response = await fetch(REDWOOD_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `{
        redwood {
          version
        }
      }`
    })
  })

  const data = await response.json()

  if (data) {
    return {
      body: data
    }
  }
}
```

```svelte
<!-- web/src/routes/index.svelte -->

<script context="module">
  export const load = async ({ fetch }) => {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return {
        props: { ...(await response.json()) }
      }
    } catch (error) {
      console.error(`Error in load function for /: ${error}`)
    }
  }
</script>

<script>
  export let data
</script>

<main class="container">
  <h2>Redwood Version - {data.redwood.version}</h2>
  <p>Woot!</p>
</main>
```

Start the development server and open [localhost:3000](http://localhost:3000).

```bash
yarn dev
```

Add the following build instructions to `netlify.toml`.

```toml
[build]
  command = "yarn build"
  publish = "build"
```

Initialize a GitHub repo and connect to Netlify for automatic deployment. I deployed each side from different branches to make it easier to manage the build commands and environment variables.
