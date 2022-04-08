import { string, z, ZodAny, ZodLazy } from "zod";

export const UserUpdateShema= z.object({
    id: z.string().cuid(),
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(6)
}).partial()

type UserUpdateShema = z.infer<typeof UserUpdateShema>;