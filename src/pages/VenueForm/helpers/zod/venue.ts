import { z } from "zod";

export const venueSchema = z
  .object({
    name: z.string().trim().min(1, "Venue name is required"),

    description: z.string().optional(),

    rows: z
      .number({ error: "Rows must be a number" })
      .int("Rows must be a whole number")
      .min(1, "At least one row is required"),

    columns: z
      .number({ error: "Columns must be a number" })
      .int("Columns must be a whole number")
      .min(1, "At least one column is required"),

    capacity: z
      .number({ error: "Capacity must be a number" })
      .int("Capacity must be a whole number")
      .min(1, "Capacity must be at least 1"),

    contact_email: z.email().trim(),

    contact_mobile: z.string().trim().min(1, "Contact mobile is required"),

    status: z.enum(["active", "inactive"]),
  })
  .superRefine((data, ctx) => {
    if (data.capacity !== data.rows * data.columns) {
      ctx.addIssue({
        code: "custom",
        path: ["capacity"],
        message: `Capacity must equal rows * columns (${data.rows * data.columns}).`,
      });
    }
  });
export type VenueFormValues = z.infer<typeof venueSchema>;
