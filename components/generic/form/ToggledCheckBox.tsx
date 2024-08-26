import { FormikProps } from "formik";
import { ToggledCheckBoxProps } from "../../types/Form";

const ToggledCheckBox: React.FC<ToggledCheckBoxProps> = (props) => {
  return (
    <div>
      <div className="items-top flex space-x-2 items-center">
        <input
          type="checkbox"
          id={props.id}
          onChange={props.handleCheckboxChange}
          className="checkbox-custom font-manrope-regular"
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={props.id}
            className="text-sm font-manrope-medium leading-none"
          >
            {props.labelName}
          </label>
        </div>
      </div>
      {props.showChildren && props.children}
    </div>
  );
};

export default ToggledCheckBox;
