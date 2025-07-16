import z from 'zod'

export const ChapterSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string().default(''),
  order: z.number().min(0).default(0),
  isDraft: z.boolean().default(true),
  courseId: z.number().int().positive(),

  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable()
})

export const CreateChaperBodySchema = ChapterSchema.pick({
  title: true,
  description: true,
  isDraft: true,
  courseId: true
}).strict()

export const CreateChaperResSchema = ChapterSchema

export const UpdateChaperBodySchema = CreateChaperBodySchema

export const UpdateChaperResSchema = ChapterSchema

export const GetChapterParamsSchema = z
  .object({
    chapterId: z.coerce.number().int().positive()
  })
  .strict()

export type ChapterType = z.infer<typeof ChapterSchema>
export type CreateChaperBodyType = z.infer<typeof CreateChaperBodySchema>
export type CreateChaperResType = z.infer<typeof CreateChaperResSchema>
export type UpdateChaperBodyType = z.infer<typeof UpdateChaperBodySchema>
export type UpdateChaperResType = z.infer<typeof UpdateChaperResSchema>
export type GetChapterParamsType = z.infer<typeof GetChapterParamsSchema>