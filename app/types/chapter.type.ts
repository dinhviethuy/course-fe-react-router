import z from 'zod'

export const ChapterSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).optional(),
  description: z.string().default('').optional(),
  order: z.number().min(0).default(0),
  isDraft: z.boolean().default(true).optional(),
  courseId: z.number().int().positive(),

  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable()
})

export const CreateChapterBodySchema = ChapterSchema.pick({
  title: true,
  description: true,
  isDraft: true,
  courseId: true
}).strict()

export const CreateChapterResSchema = ChapterSchema

export const UpdateChapterBodySchema = CreateChapterBodySchema

export const UpdateChapterResSchema = ChapterSchema

export const GetChapterParamsSchema = z
  .object({
    chapterId: z.coerce.number().int().positive()
  })
  .strict()

export type ChapterType = z.infer<typeof ChapterSchema>
export type CreateChapterBodyType = z.infer<typeof CreateChapterBodySchema>
export type CreateChapterResType = z.infer<typeof CreateChapterResSchema>
export type UpdateChatperBodyType = z.infer<typeof UpdateChapterBodySchema>
export type UpdateChapterResType = z.infer<typeof UpdateChapterResSchema>
export type GetChapterParamsType = z.infer<typeof GetChapterParamsSchema>
