/* eslint-disable react/jsx-key */

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ChartSummaryItem from "./ChartSummaryItem";

import Chart from "react-apexcharts";
import { Card } from "../ui/card";

export type GroupedBarChartProps = {
  chartOptions: any;
  selectorOptions: { header: string; options: string[] };
  heading: string;
};

const GroupedBarChart: React.FC<GroupedBarChartProps> = (props) => {
  return (
    <Card className="card card-shadow">
      <div>
        <div className="mb-5">
          <div className="flex justify-between mb-5">
            <div className="flex-column gap">
              <div className="text-zinc-800 text-xl font-semibold leading-loose">
                {props.heading}
              </div>
              <div className="text-[#8B909A] text-sm font-manrope-regular leading-5">
                Last 06 months
              </div>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Last 06 months" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{props.selectorOptions.header}</SelectLabel>
                    {props.selectorOptions.options.map((option) => {
                      return <SelectItem value={option}>{option}</SelectItem>;
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="chart-summary ">
            <ChartSummaryItem
              count={"650"}
              label={"Ordered"}
              color={"#43A954"}
            ></ChartSummaryItem>
            <ChartSummaryItem
              count={"700"}
              label={"Recieved"}
              color={"#1061AC"}
            ></ChartSummaryItem>
          </div>
        </div>
        <Chart
          options={props.chartOptions}
          series={props.chartOptions.series}
          type="bar"
          height="64.10%"
          width="98.2%"
        />
      </div>
    </Card>
  );
};

export default GroupedBarChart;
