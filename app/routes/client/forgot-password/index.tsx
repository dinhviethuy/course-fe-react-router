import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";


export default function ForgotPassword() {
  const [shownNewPassword, setShownNewPassword] = useState<boolean>(false);
  const [shownConfirmNewPassword, setShownConfirmNewPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-center">Quên mật khẩu</h1>
        <p className="text-center text-sm text-muted-foreground">
          Nhập địa chỉ email của bạn để lấy lại mật khẩu
        </p>
      </div>
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="name@example.com" className="h-10" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="otp" className="text-sm font-medium">Gửi mã OTP</label>
            <div className="flex gap-2">
              <Input type="text" placeholder="Nhập mã OTP" className="h-10" required />
              <Button className="h-10 cursor-pointer" disabled={isLoading} onClick={() => setIsLoading(true)}>
                {isLoading && <Loader2Icon className="animate-spin" />}
                Gửi mã OTP
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-sm font-medium">Mật khẩu mới</label>
            <div className="relative">
              <Input type={shownNewPassword ? "text" : "password"} placeholder="Mật khẩu mới" className="h-10" />
              {!shownNewPassword ? (
                <EyeIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShownNewPassword(!shownNewPassword)} />
              ) : (
                <EyeOffIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShownNewPassword(!shownNewPassword)} />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmNewPassword" className="text-sm font-medium">Nhập lại mật khẩu mới</label>
            <div className="relative">
              <Input type={shownConfirmNewPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu mới" className="h-10" />
              {!shownConfirmNewPassword ? (
                <EyeIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShownConfirmNewPassword(!shownConfirmNewPassword)} />
              ) : (
                <EyeOffIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShownConfirmNewPassword(!shownConfirmNewPassword)} />
              )}
            </div>
          </div>
          <Button className="h-10 cursor-pointer" disabled={isLoading} onClick={() => setIsLoading(true)}>
            {isLoading && <Loader2Icon className="animate-spin" />}
            Lấy lại mật khẩu
          </Button>
        </div>
      </div>
    </div>
  );
}

