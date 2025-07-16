import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import type { ErrorResponse } from "~/types/success.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractYoutubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;

    // Case 1: youtube.com/watch?v=ID
    if (hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }

    // Case 2: youtu.be/ID
    if (hostname.includes("youtu.be")) {
      return parsed.pathname.split("/")[1]; // /drx9y7gj_Fc
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function formatCurrency(value: number) {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

export const handleError = ({error, setError, duration = 3000}: {error: any; setError?: UseFormSetError<any>; duration?: number}) => {
  if (error instanceof AxiosError) {
    const { statusCode, message } = error.response?.data as ErrorResponse;
    if (statusCode === 422) {
      if (Array.isArray(message) && setError) {
        message.forEach((item) => {
          setError(item.path as any, { message: item.message });
        });
      } else {
        if (Array.isArray(message)) {
          const errorMessage = message.map((item) => item.message).join(", ");
          toast.error(errorMessage);
        } else {
          toast.error(message as string);
        }
      }
    } else {
      let message = "Đã xảy ra lỗi";
      if (error.response?.data && typeof error.response.data === "object" && "message" in error.response.data) {
        message = (error.response.data as { message: string }).message;
      }
      toast.error(message, {
        duration,
      });
    }
  }
}