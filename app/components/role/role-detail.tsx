import { Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Role from "~/components/role/role"
import { Button } from "~/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { useGetListPermissionQuery } from "~/hooks/usePermisson"
import { useGetRoleDetailQuery } from "~/hooks/useRole"
import type { CreateRoleBodyType } from "~/types/role.type"

interface IProps {
  roleId: number
}

export default function RoleDetailDrawer({ roleId }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: role } = useGetRoleDetailQuery({ roleId })
  const { data: permissions } = useGetListPermissionQuery({ getAll: true })

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<CreateRoleBodyType>({
    defaultValues: {
      name: '',
      description: '',
      isActive: false,
      permissionIds: []
    }
  })

  useEffect(() => {
    if (role) {
      reset({
        name: role.data.data.name,
        description: role.data.data.description,
        isActive: role.data.data.isActive,
        permissionIds: role.data.data.permissions?.map(p => p.id) || []
      })
    }
  }, [role, reset])

  return (
    <>
      <Role
        titleBox="Chi tiết vai trò"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        permissionsIndb={permissions?.data.data.permissions || []}
        permissionIds={role?.data.data.permissions?.map(p => p.id) || []}
        setValue={setValue}
        handleSubmit={handleSubmit}
        onSubmit={() => { }}
        register={register}
        errors={errors}
        control={control}
        isPending={false}
        reset={reset}
        disabled
      >
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="cursor-pointer" variant="ghost">
                <Eye className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className='dark px-2 py-1 text-xs'>Xem chi tiết</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Role>
    </>
  )
}
