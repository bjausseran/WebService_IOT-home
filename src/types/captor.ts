import { string, z, ZodAny } from "zod";

export const CaptorUpdateShema= z.object({
    id: z.string().cuid(),
    type: z.enum(["TEMPERATURE", "HUMIDITY", "BARO", "PROXIMITY"]),
    designation: z.string(),
    rawValue_int: z.number().nullish(),
    rawValue_bool: z.boolean().nullish()
}).partial()

type CaptorUpdateShema = z.infer<typeof CaptorUpdateShema>;