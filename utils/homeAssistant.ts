const HA_URL = 'http://homeassistant.local:8123/api/hassio_ingress/irKt2oSI98yUI8LLSv6xXgGSkznxNHVv7cESyfYXAVM/#node/069d4977132660c6'
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwYWQzNDkwNGViYTM0NDRhYmYzODQzYjIwMTA0M2FiZiIsImlhdCI6MTczNTkwMzI5OCwiZXhwIjoyMDUxMjYzMjk4fQ.g-1BalHFbPLPu-x78uWBJYkYaQglaFgoAQ2f_GYS5r4'

export async function callHomeAssistant(
  endpoint: string,
  method: string,
  data?: unknown
) {
  const url = `${HA_URL}${endpoint}`
  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  }

  try {
    const response = await fetch(url, options)
    const responseText = await response.text()

    let parsedData: any
    try {
      parsedData = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', responseText)
      throw new Error(`Invalid JSON response: ${responseText}`)
    }

    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status}. Message: ${JSON.stringify(
          parsedData
        )}`
      )
    }

    if (parsedData?.error) {
      throw new Error(`API error: ${JSON.stringify(parsedData.error)}`)
    }

    return parsedData
  } catch (error) {
    console.error('Error calling Home Assistant:', error)
    throw error
  }
}

