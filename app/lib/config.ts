import z from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_NODE_ENV: z.string().optional(),
  VITE_GITHUB_REPO: z.string(),
  VITE_BANK_NAME: z.string(),
  VITE_BANK_ACCOUNT: z.string(),
  VITE_BANK_ACCOUNT_NAME: z.string(),
  VITE_BANK_ACCOUNT_NUMBER: z.string(),
  VITE_BANK_CODE: z.string(),
  VITE_BANK_QR_BASE_URL: z.string()
})

const envClient = envSchema.safeParse(import.meta.env)

if (envClient.error) {
  console.log('Lỗi cấu hình env', envClient.error)
  process.exit(1)
}

const envConfig = envClient.data

export default envConfig
