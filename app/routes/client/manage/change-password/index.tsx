import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function PasswordInput({
  placeholder,
  id,
  showPassword,
  setShowPassword
}: {
  placeholder: string,
  id: string,
  showPassword: boolean, setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  }
  return (
    <div className="relative">
      <Input type={showPassword ? "text" : "password"} placeholder={placeholder} className="h-10" id={id} />
      {
        showPassword ?
          <EyeOffIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleShowPassword} />
          : <EyeIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleShowPassword} />
      }
    </div>
  )
}

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <div>
      <h3 className="text-lg font-medium">Đổi mật khẩu</h3>
      <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6" />
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="oldPassword">Mật khẩu cũ</label>
          <div className="relative">
            <PasswordInput
              placeholder="Nhập mật khẩu cũ"
              showPassword={showOldPassword}
              setShowPassword={setShowOldPassword}
              id="oldPassword" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="newPassword">Mật khẩu mới</label>
          <PasswordInput
            placeholder="Nhập mật khẩu mới"
            showPassword={showNewPassword}
            setShowPassword={setShowNewPassword}
            id="newPassword" />
          <p className="text-sm text-muted-foreground">Mật khẩu mới nên có từ 6 - 100 ký tự, và khác mật khẩu cũ</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <PasswordInput
            placeholder="Nhập lại mật khẩu mới"
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            id="confirmPassword" />
        </div>
        <Button className="w-auto h-[40px] cursor-pointer">
          <Loader2Icon className="animate-spin" />
          Đổi mật khẩu
        </Button>
      </div>
    </div>
  )
}