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