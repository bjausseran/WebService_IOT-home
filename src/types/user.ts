import { string, z, ZodAny, ZodLazy } from "zod";

export const UserUpdateShema= z.object({
    id: z.string().cuid(),
    email: z.string().email(),
    password: z.string().min(1),
    username: z.string().min(1)
}).partial()

type UserUpdateShema = z.infer<typeof UserUpdateShema>;