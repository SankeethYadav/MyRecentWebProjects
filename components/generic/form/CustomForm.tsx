/* eslint-disable react/jsx-key */
import { Formik, Form } from "formik";
import { CustomFormProps } from "../../types/Form";
import DropDownFormField from "./DropDownFormField";
import ToggledCheckBox from "./ToggledCheckBox";
import InputFormField from "./InputFormField";
import TextAreaFormField from "./TextAreaFormField";

const CustomForm: React.FC<CustomFormProps> = (props) => {
  return (
    <Formik
      initialValues={props.formikConfig.initialValues}
      validationSchema={props.formikConfig.validationSchema}
      onSubmit={props.formikConfig.handleSubmit}
    >
      <Form onSubmit={props.formik.handleSubmit}>
        <div>
          {props.formSectionProps.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="px-2 pr-6 mt-5 mb-5"
              // className={`grid grid-cols-${section.heading.length} gap-6 mt-3`}
            >
              {/* {section.heading.map((heading, headingIndex) => (
                <div
                  key={headingIndex}
                  className="col-span-1 text-black text-2xl font-bold font-DMSans leading-9"
                >
                  {heading}
                </div>
              ))} */}
              {
                <div
                  key={sectionIndex}
                  className="text-black font-manrope-bold text-2xl leading-9"
                >
                  {section.heading}
                </div>
              }
              <div className="grid grid-cols-4 gap-4 mt-3 mb-5  xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                {section.fields.map((field, index) => {
                  if (field.type === "textarea") {
                    return (
                      
                      <TextAreaFormField
                        id={field.id}
                        labelName={field.labelName}
                        width={field.width}
                        formik={props.formik}
                      />
                    );
                  } else if (field.type === "checkbox") {
                    return (
                      <ToggledCheckBox
                        formik={props.formik}
                        id={field.id}
                        handleCheckboxChange={field.handleCheckboxClick}
                        showChildren={field.showChildren}
                        labelName={field.labelName}
                      >
                        {field.children}
                      </ToggledCheckBox>
                    );
                  } else if (field.type === "input") {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <div className="col-span-1">
                        <InputFormField
                          id={field.id}
                          labelName={field.labelName}
                          formik={props.formik}
                          inputType={field.inputType}
                        />
                      </div>
                    );
                  } else if (field.type === "dropdown") {
                    return (
                      <DropDownFormField
                        id={field.id}
                        labelName={field.labelName}
                        options={field.options}
                        width={field.width}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
        </div>

        <div>
          {/* <div className="w-[343px] h-10 justify-end items-center gap-4 inline-flex">
            <Link href="/stores/1/products/catalog">
              <div className="px-3 py-2 bg-white rounded-lg shadow border border-gray-200 justify-center items-center gap-1 flex">
                <div className="px-1 justify-start items-start flex">
                  <div className="text-gray-400 text-sm font-medium font-Manrope_regular leading-normal">
                    Close
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex justify-start">
              <div className="h-10 justify-end items-center gap-4 inline-flex">
                <Button
                  type="submit"
                  className="px-3 py-2 bg-purple-900 hover:bg-purple-900 active:bg-purple-900 focus:bg-purple-900 rounded-lg justify-center items-center gap-1 flex text-white text-sm font-medium font-Manrope_regular leading-normal"
                >
                  <div className="w-6 h-6 relative">
                    {" "}
                    <Image
                      src="/img/add-ingredient.png"
                      alt="N"
                      width="20"
                      height="20"
                    />
                  </div>
                  <div className="px-1 justify-start items-start flex">
                    Add Ingredient
                  </div>
                </Button>
              </div>
            </div>
          </div> */}
          {props.children}
        </div>
      </Form>
    </Formik>
  );
};

export default CustomForm;
