import z from "zod";

export const updateProductSchema = z.object({
  articleNo: z
    .string("Article number is required")
    .min(1, "Article number is required"),
  name: z.string("Name is required").min(1, "Name is required"),
  inPrice: z.number("In price is required").int("In price must be an integer"),
  price: z.number("Price is required").int("Price must be an integer"),
  unit: z.string("Unit is required").min(1, "Unit is required"),
  quantity: z.number("Quantity is required").int("Quantity must be an integer"),
  description: z.string("Description is required"),
});
