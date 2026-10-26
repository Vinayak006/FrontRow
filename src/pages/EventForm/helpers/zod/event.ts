import { z } from "zod";

const selectOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const eventSchema = z
  .object({
    name: z.string().trim().min(1, "Event name is required"),

    venue: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .optional(),

    description: z
      .string()
      .trim()
      .transform((value) => value || null)
      .nullable(),

    base_price: z
      .number({ error: "Base price must be a number" })
      .min(0, "Base price cannot be negative"),

    from_date: z.string().min(1, "Start date is required"),

    to_date: z.string().min(1, "End date is required"),

    from_time: z.string().min(1, "Start time is required"),

    to_time: z.string().min(1, "End time is required"),

    location: z.string().trim().min(1, "Location is required"),

    contact_email: z.email().trim(),

    contact_mobile: z.string().trim().min(1, "Contact mobile is required"),

    category: selectOptionSchema.optional(),

    status: selectOptionSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.venue) {
      ctx.addIssue({
        code: "custom",
        path: ["venue"],
        message: "Venue is required",
      });
    }
    if (!data.status) {
      ctx.addIssue({
        code: "custom",
        path: ["status"],
        message: "Status is required",
      });
    }
    if (!data.category) {
      ctx.addIssue({
        code: "custom",
        path: ["category"],
        message: "Category is required",
      });
    }

    if (data.to_date < data.from_date) {
      ctx.addIssue({
        code: "custom",
        path: ["to_date"],
        message: "End date must be on or after the start date.",
      });
    }

    if (data.from_date === data.to_date && data.to_time <= data.from_time) {
      ctx.addIssue({
        code: "custom",
        path: ["to_time"],
        message: "End time must be after the start time.",
      });
    }
  });

export type EventFormValues = z.infer<typeof eventSchema>;
