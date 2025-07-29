import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { User } from "~/components/user/user";
import type { GetRolesResType } from "~/types/role.type";
import { type GetUsersResType } from "~/types/user.type";

interface IProps {
  roles: GetRolesResType['roles'],
  user: GetUsersResType['users'][number]
}

export default function UserDetail({ roles, user }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    defaultValues: {
      email: user.email,
      fullName: user.fullName,
      roleId: user.roleId,
      status: user.status,
      password: ''
    },
  })


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
    <User boxTitle="Chi tiết người dùng" roles={roles} isOpen={isOpen} setIsOpen={setIsOpen}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={() => { }}
      register={register as any}
      setValue={setValue as any}
      watch={watch as any}
      reset={reset as any}
      isPending={false}
      disabled
      tooltipText="Xem chi tiết"
    >
      <Button className="cursor-pointer" variant='ghost'>
        <Eye />
      </Button>
    </User>
  )
}