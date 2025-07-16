import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { OTPType } from "~/constants/auth.constant";
import { useForgotPasswordMutation, useSendOtpMutation } from "~/hooks/useAuth";
import { handleError } from "~/lib/utils";
import { ForgotPasswordBodySchema, type ForgotPasswordBodyType } from "~/types/auth.type";


export default function ForgotPassword() {
  const [shownNewPassword, setShownNewPassword] = useState<boolean>(false);
  const [shownConfirmNewPassword, setShownConfirmNewPassword] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, setError, getValues } = useForm({
    defaultValues: {
      email: "",
      otp: "",
      newPassword: "",
      confirmNewPassword: ""
    },
    resolver: zodResolver(ForgotPasswordBodySchema)
  });
  const forgotPasswordMutation = useForgotPasswordMutation();
  const sendOtpMutation = useSendOtpMutation();
  const navigate = useNavigate();
  const handleForgotPassword = async (data: ForgotPasswordBodyType) => {
    if (forgotPasswordMutation.isPending) return;
    try {
      await forgotPasswordMutation.mutateAsync(data);
      toast.success("Mật khẩu đã được lấy lại thành công");
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
        type: OTPType.FORGOT_PASSWORD,
      });
      toast.success("Mã OTP đã được gửi đến email của bạn");
    } catch (error) {
      handleError({ error, setError });
    }
  }
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
            <Input type="email" placeholder="name@example.com" className="h-10" {...register("email")} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="otp" className="text-sm font-medium">Gửi mã OTP</label>
            <div className="flex gap-2">
              <Input type="text" placeholder="Nhập mã OTP" className="h-10" {...register("otp")} />
              <Button className="h-10 cursor-pointer" disabled={sendOtpMutation.isPending} onClick={handleSendOtp}>
                {sendOtpMutation.isPending && <Loader2Icon className="animate-spin" />}
                Gửi mã OTP
              </Button>
            </div>
            {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-sm font-medium">Mật khẩu mới</label>
            <div className="relative">
              <Input type={shownNewPassword ? "text" : "password"} placeholder="Mật khẩu mới" className="h-10" {...register("newPassword")} />
              {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
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
              <Input type={shownConfirmNewPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu mới" className="h-10" {...register("confirmNewPassword")} />
              {errors.confirmNewPassword && <p className="text-red-500">{errors.confirmNewPassword.message}</p>}
              {!shownConfirmNewPassword ? (
                <EyeIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShownConfirmNewPassword(!shownConfirmNewPassword)} />
              ) : (
                <EyeOffIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer" onClick={() => setShownConfirmNewPassword(!shownConfirmNewPassword)} />
              )}
            </div>
          </div>
          <Button className="h-10 cursor-pointer" disabled={forgotPasswordMutation.isPending} onClick={handleSubmit(handleForgotPassword)}>
            {forgotPasswordMutation.isPending && <Loader2Icon className="animate-spin" />}
            Lấy lại mật khẩu
          </Button>
        </div>
      </div>
    </div>
  );
}

