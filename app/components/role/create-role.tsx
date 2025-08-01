import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Role from "~/components/role/role";
import { Button } from "~/components/ui/button";
import { useGetListPermissionQuery } from "~/hooks/usePermisson";
import { useCreateRoleMutation } from "~/hooks/useRole";
import { handleError } from "~/lib/utils";
import { CreateRoleBodySchema, type CreateRoleBodyType } from "~/types/role.type";

export default function CreateRole() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: permissons } = useGetListPermissionQuery({
    getAll: true
  })
  const { setValue, handleSubmit, watch, register, formState: { errors }, control, reset, setError } = useForm({
    defaultValues: {
      description: '',
      isActive: true,
      name: '',
      permissionIds: []
    },
    resolver: zodResolver(CreateRoleBodySchema)
  })
  const queryClient = useQueryClient()
  const createRoleMutation = useCreateRoleMutation()
  const onSubmit = async (data: CreateRoleBodyType) => {
    try {
      await createRoleMutation.mutateAsync(data)
      queryClient.refetchQueries({ queryKey: ['roles'] })
      reset()
      setIsOpen(false)
      toast.success('Tạo vai trò thành công')
    } catch (error) {
      handleError({ error, setError })
    }
  }
  return (
    <Role
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register as any}
      permissionIds={watch('permissionIds')}
      permissionsIndb={permissons?.data.data.permissions || [] as any}
      setValue={setValue as any}
      errors={errors}
      control={control as any}
      isPending={createRoleMutation.isPending}
      titleBox="Tạo vai trò mới"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      reset={reset as any}
      tooltipText="Tạo vai trò mới"
    >
      <Button className="cursor-pointer">
        <PlusCircle className="w-4 h-4" />
        Tạo vai trò mới
      </Button>
    </Role>
  )
}
