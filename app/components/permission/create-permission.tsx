import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Permission from "~/components/permission/permission";
import { Button } from "~/components/ui/button";
import { useCreatePermissionMutation } from "~/hooks/usePermisson";
import { handleError } from "~/lib/utils";
import { CreatePermissionBodySchema, type CreatePermissionBodyType } from "~/types/permission.type";

interface IProps {
  modules: string[]
}

export default function CreatePermission({ modules }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setValue, handleSubmit, register, formState: { errors }, reset, watch, setError } = useForm({
    defaultValues: {
      name: undefined,
      path: undefined,
      module: undefined,
      method: undefined
    },
    resolver: zodResolver(CreatePermissionBodySchema)
  })
  const queryClient = useQueryClient()
  const createPermissionMutation = useCreatePermissionMutation()
  const onSubmit = async (data: CreatePermissionBodyType) => {
    try {
      await createPermissionMutation.mutateAsync(data)
      queryClient.refetchQueries({ queryKey: ['permissions'] })
      reset()
      setIsOpen(false)
      toast.success('Tạo vai trò thành công')
    } catch (error) {
      handleError({ error, setError })
    }
  }
  return (
    <Permission
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register as any}
      setValue={setValue as any}
      errors={errors}
      isPending={createPermissionMutation.isPending}
      titleBox="Tạo quyền mới"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      reset={reset as any}
      tooltipText="Tạo quyền mới"
      modules={modules}
      watch={watch}
    >
      <Button className="cursor-pointer">
        <PlusCircle className="w-4 h-4" />
        Tạo quyền mới
      </Button>
    </Permission>
  )
}
