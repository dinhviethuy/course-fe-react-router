import z from 'zod'
import { LessonType } from '~/constants/lesson.constant'

export const LessonSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string().default(''),
  order: z.number().min(0).default(0),
  isDraft: z.boolean().default(true),
  type: z.enum(['CONTENT', 'QUIZ']).default('CONTENT'),
  chapterId: z.number().int().positive(),
  duration: z.number().min(0).default(0),
  videoUrl: z.string().nullable(),
  key: z.string().nullable(),

  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable()
})

export const CreateLessonBodySchema = LessonSchema.pick({
  title: true,
  description: true,
  isDraft: true,
  chapterId: true,
  type: true,
  duration: true,
  videoUrl: true
})
  .strict()
  .refine((data) => {
    if (!data.videoUrl && data.type === LessonType.CONTENT) {
      if (!data.description) {
        return {
          message: 'Không có video thì phải có mô tả',
          path: ['videoUrl', 'description']
        }
      }
    } else {
      if (data.type == LessonType.QUIZ && data.videoUrl) {
        return {
          message: 'Đây là quiz không phải content',
          path: ['videoUrl', 'type']
        }
      }
    }

    return true
  })

export const CreateLessonResSchema = LessonSchema

export const UpdateLessonBodySchema = CreateLessonBodySchema

export const UpdateLessonResSchema = CreateLessonResSchema

export const GetLessonParamsSchema = z.object({
  lessonId: z.coerce.number().int().positive()
})

export const GetLessonDetailResSchema = LessonSchema

export type LessonType = z.infer<typeof LessonSchema>
export type CreateLessonBodyType = z.infer<typeof CreateLessonBodySchema>
export type CreateLessonResType = z.infer<typeof CreateLessonResSchema>
export type UpdateLessonBodyType = z.infer<typeof UpdateLessonBodySchema>
export type UpdateLessonResType = z.infer<typeof UpdateLessonResSchema>
export type GetLessonParamsType = z.infer<typeof GetLessonParamsSchema>
export type GetLessonDetailResType = z.infer<typeof GetLessonDetailResSchema>
