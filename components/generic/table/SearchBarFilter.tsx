/* eslint-disable react/jsx-key */

import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { SearchBarFilterProps } from "../../types/Table";

const SearchBarFilter: React.FC<SearchBarFilterProps> = (props) => {
  return (
    <div>
      <label className="pc-label">{props.labelName}</label>
      <div className="bg-white relative">
      <Input className="search-filter-input"
        id={props.id}
        type="search"
        placeholder={props.placeHolder}
        style={{ width: "300px" }}
        value={
          (props.table.getColumn(props.column)?.getFilterValue() as string) ??
          ""
        }
        onChange={(event) =>
          props.table
            .getColumn(props.column)
            ?.setFilterValue(event.target.value)
        }
        
      />
      <div className="search-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
            stroke="#8A8AA3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      </div>
      
    </div>
  );
};

export default SearchBarFilter;
