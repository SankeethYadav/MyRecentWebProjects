import { Table } from "@tanstack/react-table";
import { FormikProps } from "formik";
import { string } from "zod";

export interface DatePickerPopUpProps {
  formik: FormikProps<any>;
  id: string;
  labelName: string;
}

export interface ToggledCheckBoxProps {
  formik: FormikProps<any>;
  id: string;
  handleCheckboxChange: () => void;
  showChildren: boolean;
  children: React.ReactNode;
  labelName: string;
  height?: string;
  width?: string;
}

export interface DropDownFormFieldProps {
  labelName: string;
  id: string;
  options: any;
  height?: string;
  width?: string;
}

export interface InputFormFieldProps {
  formik: FormikProps<any>;
  labelName: string;
  inputType: string;
  id: string;
  height?: string;
  width?: string;
}

export interface TextAreaFormFieldProps {
  formik: FormikProps<any>;
  labelName: string;
  id: string;
  height?: string;
  width?: string;
}
export interface AddIngredientFormValues {
  altId: string;
  supplierId: string;
  shippingCost: string;
  name: string;
  categoryName: string;
  markup: string;
  brand: string;
  unitOfMeasure: string;
  totalCost: string;
  visibleUntil: Date | null;
}

export interface BaseFormField {
  labelName: string;
  id: string;
  height?: string;
  width?: string;
}

export interface InputField extends BaseFormField {
  type: "input";
  inputType: "text" | "number";
}

export type optionType = {
  id: string;
  name: string;
};
export interface DropdownField extends BaseFormField {
  type: "dropdown";
  options: optionType[];
}
export interface CheckBoxField extends BaseFormField {
  type: "checkbox";
  children?: any;
  handleCheckboxClick?: any;
  showChildren: boolean;
}
export interface TextAreaField extends BaseFormField {
  type: "textarea";
}


export type FormField = InputField | DropdownField | CheckBoxField | TextAreaField;

export interface FormikConfigProps {
  initialValues: any;
  validationSchema: any;
  handleSubmit: any;
}

export interface FormSectionProps {
  heading: String;
  fields: FormField[];
}


export interface CustomFormProps {
  formik: FormikProps<any>;
  formikConfig: FormikConfigProps;
  formSectionProps: FormSectionProps[];
  children: any;
}
