/** Shared shape returned by auth server actions and consumed via useActionState. */
export type AuthActionState = {
  error?: string
  success?: string
  fieldErrors?: Record<string, string[] | undefined>
}

export const initialAuthState: AuthActionState = {}
