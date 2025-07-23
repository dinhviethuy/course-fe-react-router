import { AlertCircleIcon, ImageIcon, UploadIcon } from "lucide-react"
import { memo, useEffect } from "react"
import type { UseFormRegister, UseFormSetValue } from "react-hook-form"
import ArtPlayer from "~/components/art-player/art-player"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useFileUpload, type FileMetadata } from "~/hooks/use-file-upload"
import { cn } from "~/lib/utils"

export default memo(function UploadVideo({
  register,
  videoUrl,
  setValue,
  setFile,
}: {
  register: UseFormRegister<any>
  videoUrl: string
  setValue: UseFormSetValue<any>
  setFile: (file: File | FileMetadata) => void
}) {
  const maxSizeGB = 2
  const maxSize = maxSizeGB * 1024 * 1024 * 1024

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "video/mp4,video/mov,video/avi,video/wmv,video/flv,video/mkv,video/webm",
    maxSize,
  })

  const previewUrl = files[0]?.preview || videoUrl || null

  useEffect(() => {
    if (files[0]?.file) {
      setValue("videoUrl", previewUrl, {
        shouldDirty: true,
        shouldValidate: true,
      })
      setFile(files[0].file)
    }
  }, [files, setValue, previewUrl, setFile])

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
        >
          <Input
            {...register("videoUrl")}
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload video file"
          />

          {previewUrl ? (
            <div className="w-full h-auto rounded overflow-hidden space-y-4">
              <ArtPlayer
                option={{
                  url: previewUrl,
                }}
                className={cn("w-full max-auto h-[200px] sm:h-[300px] md:h-[400px] xl:h-[500px] 2xl:h-[600px]")}
              />

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className={cn("flex gap-2 cursor-pointer h-10", {
                    "hidden": videoUrl === previewUrl
                  })}
                  onClick={() => {
                    removeFile(files[0]?.id)
                    setValue("videoUrl", videoUrl, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }}
                  aria-label="Remove video"
                >
                  Xóa
                </Button>
                <Button
                  variant="secondary"
                  className="flex gap-2 cursor-pointer h-10"
                  onClick={openFileDialog}
                >
                  <UploadIcon className="size-4" />
                  Thay video
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ImageIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">Drop your video here</p>
              <Button variant="outline" className="mt-4" onClick={openFileDialog}>
                <UploadIcon className="-ms-1 size-4 opacity-60" aria-hidden="true" />
                Select video
              </Button>
            </div>
          )}
        </div>
      </div>

      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  )
})
