"use server";
import { cookies } from "next/headers";

// export const setCookie = (key: string, value: string, days: number = 1) => {

// }

export const getCookie = async (key: string): Promise<string | undefined> => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(key)

  return cookie?.value
}