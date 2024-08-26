
import * as React from "react";


import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const FormTextField = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ classname, form, props }, ref) => {
  return (
    <FormField
      control={form.control}
      name={props.id}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="">{props.formLabel}</FormLabel>
          <FormControl>
            <Input placeholder={props.placeHolder} {...field}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

export { FormTextField };
