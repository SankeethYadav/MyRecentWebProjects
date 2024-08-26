import { FormField, FormSectionProps, optionType } from "../types/Form";


export const unitsOfMeasurement: optionType[] = [
  {
    id: "centimeter",
    name: "cm",
  },
  { id: "inches", name: "inch" },
];

export const productDimsFields: FormField[] = [
  {
    type: "dropdown",
    labelName: "Unit(s)",
    id: "unitOfMeasurement",
    options: unitsOfMeasurement,
  },
  {
    type: "input",
    labelName: "Width",
    id: "width",
    inputType: "number",
  },
  {
    type: "input",
    labelName: "Height",
    id: "height",
    inputType: "number",
  },
  {
    type: "input",
    labelName: "Length",
    id: "length",
    inputType: "number",
  },
  {
    type: "input",
    labelName: "Weight",
    id: "weight",
    inputType: "number",
  },
];

export const unitsOfCost: optionType[] = [
  {
    id: "dollar",
    name: "Dollar($)",
  },
  { id: "rupees", name: "Rupees(Rs.)" },
];


export const addNewMenuformFields: FormSectionProps[] = [
  {
    heading: "Product Details",
    fields: [
      {
        type: "input",
        labelName: "Item Name",
        id: "itemName",
        inputType: "text",
      },

      {
        type: "dropdown",
        labelName: "Item Category",
        id: "itemCategory",
        options: [],
      },

      {
        type: "dropdown",
        labelName: "Item Size",
        id: "itemCategory",
        options: [],
      },
    ],
  },

  {
    heading: "Price",
    fields: [
      {
        type: "input",
        labelName: "Item Price",
        id: "itemPrice",
        inputType: "number",
      },
      {
        type: "input",
        labelName: "Recommended Store Price",
        id: "recStorePrice",
        inputType: "number",
      },
    ],
  },
  {
    heading: "Additional Details",
    fields: [
      {
        type: "textarea",
        labelName: "Description",
        id: "description",
      },
      {
        type: "textarea",
        labelName: "Special Accomodation",
        id: "splAccomodation",
      },
    ],
  },
];
