
import * as React from "react";


import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormDropDown = ( props ) => {
  return (
    <div class={props.classname}>
      <FormField
        control={props.form.control}
        name={props.formDD.id}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{props.formDD.formLabel}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={props.formDD.placeHolder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {props.initData.map((item, index) => (
                  <SelectItem value={item.id}>{item.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export { FormDropDown };
