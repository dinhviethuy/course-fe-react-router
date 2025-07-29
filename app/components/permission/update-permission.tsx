import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Permission from "~/components/permission/permission";
import { Button } from "~/components/ui/button";
import { useUpdatePermissionMutation } from "~/hooks/usePermisson";
import { handleError } from "~/lib/utils";
import { UpdatePermissionBodySchema, type GetPermissionsResType, type UpdatePermissionBodyType } from "~/types/permission.type";

interface IProps {
  modules: string[],
  permission: GetPermissionsResType['permissions'][number]
}

export default function UpdatePermission({ modules, permission }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setValue, handleSubmit, register, formState: { errors }, reset, watch, setError } = useForm({
    defaultValues: {
      name: permission.name,
      path: permission.path,
      module: permission.module,
      method: permission.method
    },
    resolver: zodResolver(UpdatePermissionBodySchema)
  })
  const queryClient = useQueryClient()
  const updatePermissionMutation = useUpdatePermissionMutation()
  const onSubmit = async (data: UpdatePermissionBodyType) => {
    try {
      await updatePermissionMutation.mutateAsync({
        param: {
          permissionId: permission.id
        },
        body: {
          name: data.name,
          path: data.path,
          module: data.module,
          method: data.method
        }
      })
      queryClient.refetchQueries({ queryKey: ['permissions'] })
      reset()
      setIsOpen(false)
      toast.success('Cập nhật quyền thành công')
    } catch (error) {
      handleError({ error, setError })
    }
  }

  useEffect(() => {
    reset({
      name: permission.name,
      path: permission.path,
      module: permission.module,
      method: permission.method
    })
  }, [permission, reset])

  return (
    <Permission
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register as any}
      setValue={setValue as any}
      errors={errors}
      isPending={updatePermissionMutation.isPending}
      titleBox="Cập nhật quyền"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      reset={reset as any}
      tooltipText="Cập nhật quyền"
      modules={modules}
      watch={watch}
    >
      <Button className="cursor-pointer" variant='ghost'>
        <PencilLine />
      </Button>
    </Permission>
  )
}
