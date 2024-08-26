 import { z,ZodType,ZodDate } from "zod"
export const FormSchema = z.object({
    Customer: z.string().min(2, {
      message: "Customer must be at least 2 characters.",
    }),
    MemoCode: z.string().min(2, {
      message: "Memo Code must be at least 2 characters.",
    }),
    OrderType: z.string().min(2, {
      message: "Order Type must be at least 2 characters.",
    }),
    shippment: z.date().refine(
        (date) => date !== null && !isNaN(date.getTime()),
        {
          message: "Shipment Date is required.",
        }
      ),
    // shippment: z.date({
    //   required_error: "Shipment Date is required.",
    // }),
    From: z.string().min(2, {
      message: "From must be at least 2 characters.",
    }),
    purchase: z.string().min(2, {
      message: "Purchase Order No must be at least 2 characters.",
    }),
    Forecast: z.string().min(2, {
      message: "Weekly Sales Forecast must be at least 2 characters.",
    }),
    Budget: z.string().min(2, {
      message: "Weekly Purchase Budget must be at least 2 characters.",
    }),
  });