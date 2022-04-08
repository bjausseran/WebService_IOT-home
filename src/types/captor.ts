import { string, z, ZodAny } from "zod";

export const CaptorUpdateShema= z.object({
    type: z.enum(["TEMPERATURE", "HUMIDITY", "BARO", "PROXIMITY"]),
    designation: z.string(),
    rawValue_int: z.number(),
    rawValue_bool: z.boolean()
}).partial()

type CaptorUpdateShema = z.infer<typeof CaptorUpdateShema>;