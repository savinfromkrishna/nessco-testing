import { z } from 'zod'

export const formSchema = z.object({
  fullname: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  mobilenumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  message: z.string().optional(),
})

export type FormSchema = z.infer<typeof formSchema>

