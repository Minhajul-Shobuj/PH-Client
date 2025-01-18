import { z } from "zod";

export const academiCemesterSchema = z.object({
  name: z.string({ required_error: "This field is required" }),
  year: z.string({ required_error: "Please Select a Year" }),
  startMonth: z.string({ required_error: "Please Select a Start Month" }),
  endMonth: z.string({ required_error: "Please Select a End Month" }),
});
