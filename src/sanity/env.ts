export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-25'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  "skIUIlYjpXyCjKAcKExAjlFRa7hv7K1R7Hzv8JlrvMhYubBK08nrNr5Qzd3G49rl4afScvlU3WnfmicN4MY4gD9DhbmhntxsUYAiL99YwIvYytgvO6SChz7zKYCpCpV0J1GaZLOzkOr8f7Wawzt4r8FUBTIJLcd2Vp2uVpa1HdGs3irYnFy7",
  'Missing environment variable: SANITY_API_TOKEN'
)



function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
