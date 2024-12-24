import { z } from "zod";

export const formSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobilenumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type FormSchemaType = z.infer<typeof formSchema>;

