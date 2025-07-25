import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from '@tanstack/react-query';
import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { User } from "~/components/user/user";
import { useUpdateUserMutation } from "~/hooks/useUser";
import { handleError } from "~/lib/utils";
import type { GetRolesResType } from "~/types/role.type";
import { UpdateUserBodySchema, type GetUsersResType, type UpdateUserBodyType } from "~/types/user.type";

interface IProps {
  roles: GetRolesResType['roles'],
  user: GetUsersResType['users'][number]
}

export default function UpdateUser({ roles, user }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    defaultValues: {
      email: user.email,
      fullName: user.fullName,
      roleId: user.roleId,
      status: user.status,
      password: ''
    },
    resolver: zodResolver(UpdateUserBodySchema)
  })

  const queryClient = useQueryClient()
  const updateUserMutation = useUpdateUserMutation()

  const handleUpdateUser = async (body: UpdateUserBodyType) => {

    try {
      const bodyUpdate: UpdateUserBodyType = {
        email: body.email,
        fullName: body.fullName,
        roleId: body.roleId,
        status: body.status,
      }
      if (body.password) {
        bodyUpdate.password = body.password
      }
      await updateUserMutation.mutateAsync({
        params: {
          userId: user.id
        },
        body: bodyUpdate
      })
      queryClient.refetchQueries({ queryKey: ['list-user'] })
      setIsOpen(false)
      toast.success('Cập nhật người dùng thành công')
    } catch (error) {
      handleError({ error })
    }
  }

  useEffect(() => {
    reset({
      email: user.email,
      fullName: user.fullName,
      roleId: user.roleId,
      status: user.status,
      password: ''
    })
  }, [user, reset])

  return (
    <User boxTitle="Cập nhật người dùng" roles={roles} isOpen={isOpen} setIsOpen={setIsOpen}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={handleUpdateUser as any}
      register={register as any}
      setValue={setValue as any}
      watch={watch as any}
      reset={reset}
      isPending={updateUserMutation.isPending}
    >
      <Button className="cursor-pointer" variant='ghost'>
        <PencilLine />
      </Button>
    </User>
  )
}