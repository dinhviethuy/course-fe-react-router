import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { User } from "~/components/user/user";
import { UserStatus } from "~/constants/user.constant";
import { useCreateUserMutation } from "~/hooks/useUser";
import { handleError } from "~/lib/utils";
import type { GetRolesResType } from "~/types/role.type";
import { CreateUserBodySchema, type CreateUserBodyType } from "~/types/user.type";

interface IProps {
  roles: GetRolesResType['roles']
}

export default function CreateUser({ roles }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset, setError } = useForm({
    defaultValues: {
      status: UserStatus.ACTIVE
    },
    resolver: zodResolver(CreateUserBodySchema)
  })

  const queryClient = useQueryClient()
  const createUserMutation = useCreateUserMutation()

  const handleCreateUser = async (body: CreateUserBodyType) => {
    try {
      await createUserMutation.mutateAsync(body)
      queryClient.refetchQueries({ queryKey: ['list-user'] })
      reset()
      setIsOpen(false)
      toast.success('Tạo người dùng thành công')
    } catch (error) {
      handleError({ error, setError })
    }
  }

  return (
    <User boxTitle="Tạo người dùng" roles={roles} isOpen={isOpen} setIsOpen={setIsOpen}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={handleCreateUser as any}
      register={register as any}
      setValue={setValue as any}
      watch={watch as any}
      isPending={createUserMutation.isPending}
      reset={reset as any}
      tooltipText="Tạo người dùng mới"
    >
      <Button className="cursor-pointer">
        <PlusCircle className="w-4 h-4" />
        Tạo người dùng mới
      </Button>
    </User>
  )
}