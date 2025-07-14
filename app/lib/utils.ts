import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
