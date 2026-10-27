import { describe, expect, it } from "vitest";
import { isPasswordAuthEnabled } from "./auth-mode";

describe("isPasswordAuthEnabled", () => {
  it("keeps email/password sign-in disabled in every environment", () => {
    expect(isPasswordAuthEnabled({ NODE_ENV: "development", AUTH_PASSWORD_LOGIN: "true" })).toBe(false);
    expect(isPasswordAuthEnabled({ NODE_ENV: "production", AUTH_PASSWORD_LOGIN: "true" })).toBe(false);
    expect(isPasswordAuthEnabled({ NODE_ENV: "test", AUTH_PASSWORD_LOGIN: "false" })).toBe(false);
  });
});
