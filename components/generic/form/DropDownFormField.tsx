import React from "react";
import Image from "next/image";
import { Field, ErrorMessage } from "formik";
import { DropDownFormFieldProps } from "../../types/Form";

const DropDownFormField: React.FC<DropDownFormFieldProps> = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="form"
        className="text-sm font-manrope-regular pc-label-main mb-2"
      >
        {props.labelName}
        <span className="required-star">*</span>
        <span className="">
          <Image src="/img/info-one.svg" alt="N" width="20" height="20" />
        </span>
      </label>
      <Field
        as="select"
        id={props.id}
        name={props.id + "Id"}
        className={`border pl-1 text-sm font-manrope-regular h-10 pc-input
          ${props.width ? `w-[${props.width}]` : "w-full"}`}
        placeholder={"Select " + props.labelName}
        // value={selectedFacility}
      >
        {props.options.map((option: any) => (
          <option
            className="font-manrope-regular"
            key={option.id}
            value={option.id}
          >
            {option.name}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={props.id + "Id"}
        component="p"
        className="text-red-500 text-xs font-manrope-regular"
      />
    </div>
  );
};

export default DropDownFormField;
