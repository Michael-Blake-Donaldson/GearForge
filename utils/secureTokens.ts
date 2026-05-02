import {
    deleteSecureValue,
    getSecureValue,
    saveSecureValue,
} from "@/utils/secureStorage";

const ACCESS_KEY = "gearforge_access_token";
const REFRESH_KEY = "gearforge_refresh_token";

export async function storeTokens(accessToken: string, refreshToken: string) {
  if (!accessToken || !refreshToken) return;
  await Promise.all([
    saveSecureValue(ACCESS_KEY, accessToken),
    saveSecureValue(REFRESH_KEY, refreshToken),
  ]);
}

export async function clearTokens() {
  await Promise.all([
    deleteSecureValue(ACCESS_KEY),
    deleteSecureValue(REFRESH_KEY),
  ]);
}

export async function getStoredTokens() {
  const [accessToken, refreshToken] = await Promise.all([
    getSecureValue(ACCESS_KEY),
    getSecureValue(REFRESH_KEY),
  ]);
  return { accessToken, refreshToken };
}
