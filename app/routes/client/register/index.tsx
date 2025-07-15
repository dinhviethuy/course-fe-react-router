import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";


export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-center">Tạo tài khoản</h1>
        <p className="text-center text-sm text-muted-foreground">
          Tài khoản này sẽ dùng để mua khóa học, học tập
        </p>
      </div>
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">Họ và tên</label>
            <Input type="text" placeholder="Joe Doe" className="h-10" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="name@example.com" className="h-10" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="otp" className="text-sm font-medium">Nhập mã OTP</label>
            <div className="flex gap-2">
              <Input type="text" placeholder="Nhập mã OTP" className="h-10" required />
              <Button className="h-10 cursor-pointer" disabled={isLoading} onClick={() => setIsLoading(true)}>
                {isLoading && <Loader2Icon className="animate-spin" />}
                Gửi mã OTP
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">Mật khẩu</label>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" className="h-10" />
              {!showPassword ? (
                <EyeIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <EyeOffIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">Nhập lại mật khẩu</label>
            <div className="relative">
              <Input type={showConfirmPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" className="h-10" />
              {!showConfirmPassword ? (
                <EyeIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
              ) : (
                <EyeOffIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
              )}
            </div>
          </div>
          <Button className="h-10 cursor-pointer" disabled={isLoading} onClick={() => setIsLoading(true)}>
            {isLoading && <Loader2Icon className="animate-spin" />}
            Đăng ký
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Nếu bạn đã có tài khoản</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Link to="/login" className="h-10 cursor-pointer">
            <Button className="w-full h-10 cursor-pointer" variant="outline">
              Đăng nhập
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-1">
            <span className="text-center text-sm text-muted-foreground">
              Bạn quên mật khẩu?
            </span>
            <Link to="/forgot-password" className="text-muted-foreground underline">Lấy lại mật khẩu</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

