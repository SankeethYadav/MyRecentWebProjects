import React from "react";
import Image from "next/image";
import { Field, ErrorMessage, FieldProps } from "formik";
import { Textarea } from "@/components/ui/textarea";
import { TextAreaFormFieldProps } from "@/components/types/Form";

const TextAreaFormField: React.FC<TextAreaFormFieldProps> = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.labelName}
        className="text-sm font-manrope-regular pc-label-main mb-2"
      >
        {props.labelName} <span className="required-star">*</span>
        <span>
          <Image src="/img/info-one.svg" alt="N" width="20" height="20" />
        </span>
      </label>
      <div className={`${props.width ? `w-[${props.width}]` : "w-full"}`}>
        <Field
          id={props.labelName}
          name={props.labelName}
          render={({ field }: FieldProps<any>) => (
            <Textarea
              className="border font-manrope-regular placeholder:text-[#9ca3af]
                    focus:outline-none focus:border-[#005FCC]  focus:border-[2px] bg-white p-2 text-sm pc-input"
              {...field}
              placeholder={`Enter ${props.labelName}`}
            />
          )}
        />
      </div>
      <ErrorMessage
        name={props.labelName}
        component="p"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

export default TextAreaFormField;
