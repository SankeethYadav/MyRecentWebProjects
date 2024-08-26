import { ApexOptions } from "apexcharts";

export const comparisionBarChartOptions: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: true,
      export: {
        csv: {
          filename: "Bar-Chart",
          columnDelimiter: ",",
          headerCategory: "category",
          headerValue: "value",
        },
        svg: {
          filename: "Bar-Chart",
        },
        png: {
          filename: "Bar-Chart",
        },
      },
      autoSelected: "zoom",
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      borderRadius: 10,
    },
  },
  dataLabels: {
    enabled: false,
    // enabledOnSeries: undefined,
    
    // textAnchor: "middle",
    // distributed: false,
    // offsetX: 0,
    // offsetY: 0,
    // style: {
    //   fontSize: "10px",
    //   fontFamily: "Helvetica, Arial, sans-serif",
    //   fontWeight: "bold",
    //   colors: undefined,
    // },
    // background: {
    //   enabled: true,
    //   foreColor: "#fff",
    //   padding: 4,
    //   borderRadius: 2,
    //   borderWidth: 1,
    //   borderColor: "#fff",
    //   opacity: 0.9,
    // },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: [
      "Jul 2023",
      "Aug 2023",
      "Sep 2023",
      "Oct 2023",
      "Nov 2023",
      "Dec 2023",
    ],
  },
  yaxis: {
    title: {
      text: "Orders",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    // y: {
    //   formatter: (val: any) => `${val} orders`,
    // },
    enabled: true,
    enabledOnSeries: undefined,
    shared: true,
    followCursor: false,
    intersect: false,
    inverseOrder: false,
    custom: undefined,
    hideEmptySeries: true,
    fillSeriesColor: false,
    style: {
      fontSize: "12px",
      fontFamily: "Manrope",
    },
    onDatasetHover: {
      highlightDataSeries: false,
    },
    x: {
      show: true,
      format: "dd MMM",
      formatter: undefined,
    },
    y: {
      formatter: undefined,
      title: {
        formatter: (seriesName) => seriesName,
      },
    },
    z: {
      formatter: undefined,
      title: "Size: ",
    },
    marker: {
      show: true,
    },
    items: {
      display: "flex",
    },
    fixed: {
      enabled: false,
      position: "topRight",
      offsetX: 0,
      offsetY: 0,
    },
  },
  colors: ["#1061AC", "#43A954"],
  legend: {
    position: "top",
    onItemClick: {
      toggleDataSeries: true,
    },
  },

  series: [
    {
      name: "Ordered",
      data: [ 130, 120, 90, 80, 150, 80],
    },
    {
      name: "Received",
      data: [ 80, 100, 50, 60, 100, 70],
    },
  ],
};

