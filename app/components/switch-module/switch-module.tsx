import { useState } from "react"
import type { UseFormSetValue } from "react-hook-form"
import RequestMethod from "~/components/method/method"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~/components/ui/accordion"
import { Card, CardContent } from "~/components/ui/card"
import { Switch } from "~/components/ui/switch"
import type { GetPermissionsResType } from "~/types/permission.type"
import type { CreateRoleBodyType } from "~/types/role.type"

interface IProps {
  permissions: GetPermissionsResType['permissions']
  permissionIds: number[]
  module: string,
  setValue: UseFormSetValue<CreateRoleBodyType>,
  disabled?: boolean
}

export default function SwitchModule({ permissions, permissionIds, module, setValue, disabled }: IProps) {
  const [allChecked, setAllChecked] = useState(permissions.every((permission) => permissionIds.includes(permission.id)))
  const handleSelectAll = () => {
    if (disabled) return
    if (allChecked) {
      setValue('permissionIds', permissionIds.filter((id) => !permissions.map((permission) => permission.id).includes(id)))
    } else {
      setValue('permissionIds', [...permissionIds, ...permissions.map((permission) => permission.id)])
    }
    setAllChecked(!allChecked)
  }
  const handleCheckedChange = (permissionId: number) => {
    if (disabled) return

    let newPermissionIds: number[];

    if (permissionIds.includes(permissionId)) {
      newPermissionIds = permissionIds.filter((id) => id !== permissionId);
    } else {
      newPermissionIds = [...permissionIds, permissionId];
    }

    setValue('permissionIds', newPermissionIds);

    const isAllChecked = permissions.every((permission) => newPermissionIds.includes(permission.id));
    setAllChecked(isAllChecked);
  };


  return (
    <div className="px-4 text-card-foreground flex flex-col rounded-xl border">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value={module} className="py-2">
          <div className="flex items-center justify-between">
            <AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline [&>svg]:-order-1">
              {module}
            </AccordionTrigger>
            <Switch checked={allChecked} onCheckedChange={handleSelectAll} disabled={disabled} className="cursor-pointer" />
          </div>
          <AccordionContent className="grid grid-cols-2 gap-4">
            {permissions.map((permission) => (
              <Card key={permission.id} className="col-span-1 bg-background">
                <CardContent>
                  <div key={permission.id} className="grid grid-cols-5">
                    <div className="col-span-1">
                      <Switch className="cursor-pointer" checked={permissionIds.includes(permission.id)} onCheckedChange={() => handleCheckedChange(permission.id)} disabled={disabled} />
                    </div>
                    <div className="col-span-4 flex flex-col gap-1">
                      <span className="text-sm font-semibold">{permission.name}</span>
                      <RequestMethod method={permission.method} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}