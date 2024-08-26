/* eslint-disable react/jsx-key */

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { DropDownFilterProps } from "../../types/Table";

const DropDownFilter: React.FC<DropDownFilterProps> = (props) => {
  return (
    <div className="ml-2">
      <label for={props.id} className="pc-label">
        {props.labelName}
      </label>
      <br />
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="flex items-center justify-between w-[300px] bg-white border border-gray-300"
        >
          <Button variant="outline" className="ml-auto">
            {props.selectedValue ? props.selectedValue : props.placeHolder}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {props.options.map((value, index) => (
            <DropdownMenuCheckboxItem
              key={index}
              className="capitalize"
              checked={props.selectedValue === value.name}
              onCheckedChange={(value) =>
                props.handleSelectedOption(value ? value.name : "")
              }
            >
              {value.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownFilter;
