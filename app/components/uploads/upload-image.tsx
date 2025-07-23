import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react"
import { useEffect } from "react"
import type { UseFormRegister, UseFormSetValue } from "react-hook-form"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { type FileMetadata, type FileWithPreview } from "~/hooks/use-file-upload"
import { cn } from "~/lib/utils"

export default function UploadImage({
  register,
  image,
  setValue,
  setFile,
  uploadFile,
}: {
  register: UseFormRegister<any>
  image: string
  setValue: UseFormSetValue<any>
  setFile: (file: File | FileMetadata) => void,
  uploadFile: {
    handleDragEnter: (e: React.DragEvent<HTMLElement>) => void,
    handleDragLeave: (e: React.DragEvent<HTMLElement>) => void,
    handleDragOver: (e: React.DragEvent<HTMLElement>) => void,
    handleDrop: (e: React.DragEvent<HTMLElement>) => void,
    openFileDialog: () => void,
    removeFile: (id: string) => void,
    getInputProps: (props?: React.InputHTMLAttributes<HTMLInputElement>) => React.InputHTMLAttributes<HTMLInputElement> & { ref: React.Ref<HTMLInputElement> },
    files: FileWithPreview[],
    isDragging: boolean,
    errors: string[],
    maxSizeMB: number
  }
}) {

  const { errors, files, getInputProps, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, isDragging, openFileDialog, removeFile, maxSizeMB } = uploadFile

  const previewUrl = files[0]?.preview || image || null

  useEffect(() => {
    if (files[0]?.file) {
      setValue("image", previewUrl, {
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
            {...register("image")}
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
          />

          {previewUrl ? (
            <div className="relative w-[300px] h-[200px] group rounded overflow-hidden border border-border">
              <img
                src={previewUrl}
                alt={files[0]?.file?.name || "Uploaded image"}
                className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex gap-2 cursor-pointer"
                  onClick={openFileDialog}
                >
                  <UploadIcon className="size-4" />
                  Thay ảnh
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
              <p className="mb-1.5 text-sm font-medium">Drop your image here</p>
              <p className="text-muted-foreground text-xs">
                SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
              </p>
              <Button variant="outline" type="button" className="mt-4" onClick={openFileDialog}>
                <UploadIcon className="-ms-1 size-4 opacity-60" aria-hidden="true" />
                Select image
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className={cn(
                "focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]",
                {
                  "hidden": previewUrl === image,
                }
              )}
              onClick={() => {
                removeFile(files[0]?.id)
                setValue("image", image, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }}
              aria-label="Remove image"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  )
}
