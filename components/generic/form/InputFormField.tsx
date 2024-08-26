import React from "react";
import Image from "next/image";
import { Field, ErrorMessage } from "formik";
import { InputFormFieldProps } from "@/components/types/Form";

const InputFormField: React.FC<InputFormFieldProps> = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.labelName}
        className="text-sm font-manrope-regular whitespace-nowrap pc-label-main mb-2"
      >
        {props.labelName} <span className="required-star">*</span>
        <div className="flex-shrink-0">
          <Image src="/img/info-one.svg" alt="N" width="20" height="20" />{" "}
        </div>
      </label>
      <div className={`${props.width ? `w-[${props.width}]` : "w-full"}`}>
        <Field
          type={props.inputType}
          id={props.labelName}
          name={props.labelName}
          className={`border p-2 text-sm h-10 w-full pc-input ${
            props.formik.touched[props.id] && props.formik.errors[props.id]
              ? "border-red-500"
              : ""
          }
            
            `}
          placeholder={"Enter " + props.labelName}
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

export default InputFormField;
