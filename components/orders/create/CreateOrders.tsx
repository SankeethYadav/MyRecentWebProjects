"use client"
import { FormSchema } from "../../../app/validations/formvalidations";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import {
     Card,
     CardContent,
     CardFooter,
     CardHeader,
     CardTitle,
   } from "@/components/ui/card";
 function CreateOrders() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { formState } = form; // Access form state
  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-red-0 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const [date, setDate] = React.useState<Date>();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  return (
    <Card className="w-full h-100 border rounded p-2 mt-1">
      <CardHeader>
        <CardTitle className="text-lg mb-1">Create Order</CardTitle>
      </CardHeader>
      <CardContent >
        <div className="grid grid-cols-3 gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="Customer"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Customer</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        className={`w-full h-8 border rounded p-2`}
                        placeholder="Enter Customer Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500">
                      {formState.errors.Customer ? formState.errors.Customer.message : null}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="MemoCode"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Memo Code</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        className={`w-full h-8 border rounded p-2`}
                        placeholder="Enter Memo Code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500">
                      {formState.errors.MemoCode ? formState.errors.MemoCode.message : null}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="OrderType"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Order Type</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        className={`w-full h-8 border rounded p-2`}
                        placeholder="Enter Order Type"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500">
                      {formState.errors.OrderType ? formState.errors.OrderType.message : null}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippment"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel style={{ color: formState.errors.shippment ? 'red' : 'black' }}>Choose a ship date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            onClick={() => setIsPopoverOpen(true)}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        {isPopoverOpen && (
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        )}
                      </Popover>
                    </FormControl>
                    <FormMessage style={{ color: formState.errors.shippment ? "red" : "black" }}>
                      {formState.errors.shippment ? formState.errors.shippment.message : null}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="From"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        className={`w-full h-8 border rounded p-2`}
                        placeholder="Enter From"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500">
                      {formState.errors.From ? formState.errors.From.message : null}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purchase"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Purchase Order No</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        className={`w-full h-8 border rounded p-2`}
                        placeholder="Enter Purchase Order No"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500">
                      {formState.errors.purchase ? formState.errors.purchase.message : null}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Forecast"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Weekly Sales Forecast ($)</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        className={`w-full h-8 border rounded p-2`}
                        placeholder="Enter Weekly Sales Forecast"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500">
                      {formState.errors.Forecast ? formState.errors.Forecast.message : null}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Budget"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Weekly Purchase Budget($ @28)</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        className={`w-full h-8 border rounded p-2`}
                        placeholder="Enter Weekly Purchase Budget"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500">
                      {formState.errors.Budget ? formState.errors.Budget.message : null}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </CardContent>
            <CardFooter className="flex justify-end pb-0 m-2 gap-2">
         <Button variant="outline" type="submit" className="text-xs h-8 rounded-[8px] text-white bg-red-500">Cancel</Button>
        <Button variant="outline" type="submit" className="text-xs h-8 rounded-[8px] text-white  bg-green-500" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
         <Button variant="outline" type="submit" className="text-xs h-8 rounded-[8px] text-white bg-blue-500">Review Order</Button>
       </CardFooter>
     </Card>
  );
}

export default CreateOrders;