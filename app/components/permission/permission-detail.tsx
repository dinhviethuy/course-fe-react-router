import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Permission from "~/components/permission/permission";
import { Button } from "~/components/ui/button";
import { type GetPermissionsResType } from "~/types/permission.type";

interface IProps {
  modules: string[]
  permission: GetPermissionsResType['permissions'][number]
}

export default function PermissionDetail({ modules, permission }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setValue, handleSubmit, register, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      name: permission.name,
      path: permission.path,
      module: permission.module,
      method: permission.method
    }
  })

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
      onSubmit={() => { }}
      register={register as any}
      setValue={setValue as any}
      errors={errors}
      isPending={false}
      titleBox="Chi tiết quyền"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      reset={reset as any}
      tooltipText="Xem Chi tiết"
      modules={modules}
      watch={watch}
      disabled
    >
      <Button className="cursor-pointer" variant='ghost'>
        <Eye />
      </Button>
    </Permission>
  )
}
