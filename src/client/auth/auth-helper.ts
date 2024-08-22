import { signOut } from "./api-auth";
import { logger } from "../../utils/logger";
type Callback = () => void;

function authenticate(jwt: string, callback: Callback): void {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    } catch (error: unknown) {
      logger.error(
        JSON.stringify({
          method: "authenticate",
          error,
        })
      );
    }
  }

  callback();
}

function isAuthenticated(): object | boolean {
  try {
    if (typeof window == "undefined") return false;
    const jwt = sessionStorage.getItem("jwt");
    return jwt ? JSON.parse(jwt) : false;
  } catch (error: unknown) {
    logger.error(
      JSON.stringify({
        method: "authenticate",
        error,
      })
    );
    return false;
  }
}

async function clearJWT(callback: Callback): Promise<void> {
  try {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("jwt");
    }
    await signOut();
    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00UTC; path=/;";
    callback();
  } catch (error: unknown) {
    logger.error(
      JSON.stringify({
        method: "clearJWT",
        error,
      })
    );
  }
}

export { clearJWT, isAuthenticated, authenticate };
