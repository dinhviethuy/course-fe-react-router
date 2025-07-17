import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useGetProfileQuery, useUpdateProfileMutation } from "~/hooks/useUser";
import { handleError } from "~/lib/utils";
import { UpdateProfileBodySchema, type UpdateProfileBodyType } from "~/types/profile.type";

export default function Profile() {
  const { data, refetch } = useGetProfileQuery();
  const updateProfileMutation = useUpdateProfileMutation();

  const form = useForm<UpdateProfileBodyType>({
    resolver: zodResolver(UpdateProfileBodySchema),
    defaultValues: {
      fullName: "",
    },
  });

  useEffect(() => {
    if (data?.data?.data) {
      form.reset({
        fullName: data.data.data.fullName || "",
      });
    }
  }, [data, form]);

  const handleUpdateProfile = form.handleSubmit(async (data) => {
    if (updateProfileMutation.isPending) return;
    try {
      await updateProfileMutation.mutateAsync(data);
      toast.success("Cập nhật thông tin tài khoản thành công");
      refetch();
    } catch (error) {
      handleError({
        error,
        setError: form.setError,
      });
    }
  });

  const profile = data?.data?.data;

  return (
    <div>
      <div className="space-y-0.5">
        <h3 className="text-lg font-medium">Thông tin tài khoản</h3>
        <p className="text-sm text-muted-foreground">
          Bạn có thể chỉnh sửa thông tin tài khoản của mình ở đây.
        </p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-6"
      />
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="name">
            Họ và tên
          </label>
          <Input
            type="text"
            placeholder="Nhập họ và tên"
            className="h-10"
            {...form.register("fullName")}
          />
          <p className="text-sm text-muted-foreground">
            Tên này sẽ được hiển thị trên trang cá nhân của bạn.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            disabled
            className="h-10"
            defaultValue={profile?.email}
          />
          <p className="text-sm text-muted-foreground">
            Bạn không thể thay đổi email (nếu muốn thay đổi, vui lòng liên hệ quản trị viên)
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-sm font-medium">Tình trạng tài khoản</span>
            <Badge variant="default">
              {profile?.status?.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Tài khoản của bạn đang hoạt động, bạn có thể sử dụng tài khoản của mình để đặt hàng.
          </p>
        </div>
        <Button
          className="w-auto h-[40px] cursor-pointer"
          onClick={handleUpdateProfile}
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending && (
            <Loader2Icon className="animate-spin mr-2" />
          )}
          Cập nhật tài khoản
        </Button>
      </div>
    </div>
  );
}
