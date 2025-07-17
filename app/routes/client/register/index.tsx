import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { OTPType } from "~/constants/auth.constant";
import { useRegisterMutation, useSendOtpMutation } from "~/hooks/useAuth";
import { handleError } from "~/lib/utils";
import { useAuthStore } from "~/stores/useAuthStore";
import { RegisterBodySchema, type RegisterBodyType } from "~/types/auth.type";


export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { setIsLogout, setIsAuthenticated } = useAuthStore()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError, getValues } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(RegisterBodySchema),
  });
  const registerMutation = useRegisterMutation();
  const sendOtpMutation = useSendOtpMutation();
  const handleRegister = async (data: RegisterBodyType) => {
    if (registerMutation.isPending) return;
    try {
      await registerMutation.mutateAsync(data);
      toast.success("Tạo tài khoản thành công");
      setIsLogout(false)
      setIsAuthenticated(true)
      navigate("/login");
    } catch (error) {
      handleError({ error, setError });
    }
  }
  const handleSendOtp = async () => {
    if (sendOtpMutation.isPending) return;
    try {
      const email = getValues("email");
      if (!email) {
        setError("email", { message: "Email không được để trống" });
        return;
      }
      await sendOtpMutation.mutateAsync({
        email,
        type: OTPType.REGISTER,
      });
      toast.success("Mã OTP đã được gửi đến email của bạn");
    } catch (error) {
      handleError({ error, setError });
    }
  }
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
          <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">Họ và tên</label>
              <Input type="text" placeholder="Joe Doe" className="h-10" {...register("fullName")} />
              {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="name@example.com" className="h-10" {...register("email")} />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="otp" className="text-sm font-medium">Nhập mã OTP</label>
              <div className="flex gap-2">
                <Input type="text" placeholder="Nhập mã OTP" className="h-10" {...register("otp")} />
                <Button className="h-10 cursor-pointer" disabled={registerMutation.isPending} onClick={handleSendOtp}>
                  {sendOtpMutation.isPending && <Loader2Icon className="animate-spin" />}
                  Gửi mã OTP
                </Button>
              </div>
              {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">Mật khẩu</label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" className="h-10" {...register("password")} />
                {!showPassword ? (
                  <EyeIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <EyeOffIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">Nhập lại mật khẩu</label>
              <div className="relative">
                <Input type={showConfirmPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" className="h-10" {...register("confirmPassword")} />
                {!showConfirmPassword ? (
                  <EyeIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                ) : (
                  <EyeOffIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                )}
              </div>
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <Button className="h-10 cursor-pointer" disabled={registerMutation.isPending}>
              {registerMutation.isPending && <Loader2Icon className="animate-spin" />}
              Đăng ký
            </Button>
          </form>
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

