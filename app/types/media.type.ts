import z from 'zod'

export const UploadImageResSchema = z.object({
  key: z.string(),
  type: z.enum(['image', 'video']),
  url: z.string()
})

export const UploadVideoResSchema = UploadImageResSchema.extend({
  duration: z.number()
})

export type UploadImageResType = z.infer<typeof UploadImageResSchema>
export type UploadVideoResType = z.infer<typeof UploadVideoResSchema>
