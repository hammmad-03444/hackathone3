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
  "sko0jWMwPhzQoSb0NaD9UM5unyZ3CNvCL4mMuy4mk5PuvzpuONlKE2BRPICMhr0VmUt3B09qJEY5mPqdpUIVQJ04bRDOpR4LsY4NmxXYfCTPHnZxG8sU6TuOBKbCtwHPfamHMCoUwRnRDhuxL8SHH7YkqkhxXRrOkCyczDzRq2TvdvXsERNR",
  'Missing environment variable: SANITY_API_TOKEN'
)



function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
