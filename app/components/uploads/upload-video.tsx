// ~/components/uploads/upload-video.tsx
import { AlertCircleIcon, ImageIcon, UploadIcon } from 'lucide-react'
import { useEffect, useRef } from 'react' // Import useRef
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import ArtPlayer from '~/components/art-player/art-player'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { ADMIN_PERMISSIONS } from '~/constants/permission.constant'
import { useFileUpload, type FileMetadata } from '~/hooks/use-file-upload'
import { CheckAccess, cn } from '~/lib/utils'
import { useAuthStore } from '~/stores/useAuthStore'

export default function UploadVideo({
  register,
  videoUrl,
  setValue,
  setFile,
  disabled
}: {
  register: UseFormRegister<any>
  videoUrl: string | null | undefined
  setValue: UseFormSetValue<any>
  setFile: (file: File | FileMetadata | null) => void
  disabled?: boolean
}) {
  const maxSizeGB = 2
  const maxSize = maxSizeGB * 1024 * 1024 * 1024
  const { permissions } = useAuthStore()
  const isShowUpload = CheckAccess({
    method: ADMIN_PERMISSIONS.MEDIA.POST_MEDIA_VIDEOS_UPLOAD.method,
    path: ADMIN_PERMISSIONS.MEDIA.POST_MEDIA_VIDEOS_UPLOAD.path,
    permissions
  })
  const [
    { files, isDragging, errors },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps }
  ] = useFileUpload({
    accept: 'video/mp4,video/mov,video/avi,video/wmv,video/flv,video/mkv,video/webm',
    maxSize
  })

  const prevVideoUrlRef = useRef(videoUrl)

  const previewUrl = disabled ? null : files[0]?.preview || videoUrl || null

  useEffect(() => {
    if (disabled) return
    if (files[0]?.file) {
      setValue('videoUrl', previewUrl, {
        shouldDirty: true,
        shouldValidate: true
      })
      setFile(files[0].file)
    }
  }, [files, setValue, previewUrl, setFile, disabled])

  useEffect(() => {
    if (videoUrl !== prevVideoUrlRef.current) {
      if (files.length > 0) {
        removeFile(files[0].id)
      }
      prevVideoUrlRef.current = videoUrl
    }
  }, [videoUrl, files, removeFile, setValue])

  return (
    <div className='flex flex-col gap-2'>
      <div className='relative'>
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className='border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]'
        >
          <Input {...register('videoUrl')} {...getInputProps()} className='sr-only' aria-label='Upload video file' />

          {previewUrl ? (
            <div className='w-full h-auto rounded overflow-hidden space-y-4'>
              <ArtPlayer
                option={{
                  url: previewUrl
                }}
                className={cn('w-full max-auto h-[200px] sm:h-[300px] md:h-[400px] xl:h-[500px] 2xl:h-[600px]')}
                canSkip={true}
              />

              <div className={cn('flex justify-center gap-4', (disabled || !isShowUpload) && 'hidden')}>
                <Button
                  variant='outline'
                  type='button'
                  className={cn('flex gap-2 cursor-pointer h-10', {
                    hidden: videoUrl === previewUrl && !files[0]?.file
                  })}
                  onClick={() => {
                    removeFile(files[0]?.id)
                    setValue('videoUrl', videoUrl, {
                      shouldDirty: true,
                      shouldValidate: true
                    })
                    setFile(null)
                  }}
                  aria-label='Remove video'
                >
                  Xóa
                </Button>
                <Button
                  variant='secondary'
                  type='button'
                  className='flex gap-2 cursor-pointer h-10'
                  onClick={openFileDialog}
                  disabled={disabled || !isShowUpload}
                >
                  <UploadIcon className='size-4' />
                  Thay video
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                'flex flex-col items-center justify-center px-4 py-3 text-center',
                (disabled || !isShowUpload) && 'hidden'
              )}
            >
              <div
                className='bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border'
                aria-hidden='true'
              >
                <ImageIcon className='size-4 opacity-60' />
              </div>
              <p className='mb-1.5 text-sm font-medium'>Drop your video here</p>
              <Button
                variant='outline'
                type='button'
                className='mt-4 cursor-pointer'
                onClick={openFileDialog}
                disabled={disabled || !isShowUpload}
              >
                <UploadIcon className='-ms-1 size-4 opacity-60' aria-hidden='true' />
                Select video
              </Button>
            </div>
          )}
        </div>
      </div>

      {errors.length > 0 && (
        <div className='text-destructive flex items-center gap-1 text-xs' role='alert'>
          <AlertCircleIcon className='size-3 shrink-0' />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  )
}
