import { FormikProps } from "formik";
import { DatePickerPopUpProps } from "../../types/Form";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const DatePickerPopUp: React.FC<DatePickerPopUpProps> = (props) => {
  return (
    <div className="mb-4 w-96 mt-4 date-input">
      <label
        htmlFor={props.id}
        className="text-sm font-manrope-regular pc-label-main mb-2"
      >
        {props.labelName}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`w-full justify-start h-12 font-manrope-regular border-inherit text-sm rounded-none text-left font-normal border flex items-center ${
              !props.formik.values[props.id] ? "text-muted-foreground" : ""
            }`}
          >
            <CalendarIcon className="ml-2 stroke-primary-blue  mr-2 h-4 w-4" />
            {props.formik.values[props.id]
              ? format(props.formik.values[props.id], "yyyy-MM-dd")
              : props.labelName}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            name={props.id}
            id={props.id}
            selected={props.formik.values[props.id]}
            onSelect={(selectedDate: any) => {
              console.log("Selected date:", selectedDate);
              props.formik.setFieldValue(props.id, selectedDate);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerPopUp;
