import { string, z, ZodAny } from "zod";

export const ActuatorUpdateSchema= z.object({
    id: z.string().cuid(),
    type: z.enum(["BLINDS", "LIGHT"]),
    designation: z.string(),
    state: z.boolean()
}).partial()

type ActuatorUpdateSchema = z.infer<typeof ActuatorUpdateSchema>;
