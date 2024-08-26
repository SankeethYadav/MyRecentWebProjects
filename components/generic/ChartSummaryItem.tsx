import { ChartSummaryItemProps } from "../types/Charts";



const ChartSummaryItem: React.FC<ChartSummaryItemProps> = (props) => {
  return (
    <div
      className="prose chart-summary-item"
      style={{ borderColor: props.color }}
    >
      <div className="chart-summary-number" style={{ color: props.color }}>
        {props.count}
      </div>
      <div className="chart-summary-label">{props.label}</div>
    </div>
  );
};

export default ChartSummaryItem;
