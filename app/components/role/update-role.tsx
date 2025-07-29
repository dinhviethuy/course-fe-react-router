import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Role from "~/components/role/role";
import { Button } from "~/components/ui/button";
import { useGetListPermissionQuery } from "~/hooks/usePermisson";
import { useGetRoleDetailQuery, useUpdateRoleMutation } from "~/hooks/useRole";
import { handleError } from "~/lib/utils";
import { UpdateRoleBodySchema, type UpdateRoleBodyType } from "~/types/role.type";

interface IProps {
  roleId: number
}

export default function UpdateRole({ roleId }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: role } = useGetRoleDetailQuery({
    roleId
  })
  const { data: permissons, refetch } = useGetListPermissionQuery({
    getAll: true
  })
  const { setValue, handleSubmit, watch, register, formState: { errors }, control, reset, setError } = useForm({
    resolver: zodResolver(UpdateRoleBodySchema)
  })
  const queryClient = useQueryClient()
  const updateRoleMutation = useUpdateRoleMutation()
  const onSubmit = async (data: UpdateRoleBodyType) => {
    try {
      await updateRoleMutation.mutateAsync({
        params: {
          roleId
        },
        body: data
      })
      refetch()
      queryClient.refetchQueries({ queryKey: ['roles'] })
      setIsOpen(false)
      toast.success('Cập nhật vai trò thành công')
    } catch (error) {
      handleError({ error, setError })
    }
  }
  useEffect(() => {
    if (!role) return
    const permissonIds = role.data.data.permissions.map((permission) => permission.id)
    reset({
      description: role?.data.data.description,
      isActive: role?.data.data.isActive,
      name: role?.data.data.name,
      permissionIds: permissonIds
    })
  }, [reset, role])
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
      isPending={updateRoleMutation.isPending}
      titleBox="Cập nhật vai trò"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      reset={reset as any}
      tooltipText="Cập nhật vai trò"
    >
      <Button className="cursor-pointer" variant='ghost'>
        <PencilLine />
      </Button>
    </Role >
  )
}
