import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SuccessBySeller } from "types/sale";
import { round } from "utils/format";
import { baseURL } from "utils/requests";

// import { Container } from './styles';

interface SeriesData {
  name: string;
  data: number[];
}
interface ChartData {
  labels: { categories: string[] };
  series: SeriesData[];
}

const BarChart: React.FC = () => {
  const [barData, setBarData] = useState<ChartData>({
    labels: {
      categories: []
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    axios.get(`${baseURL}/sales/sucessbyseller`).then((response) => {
      const data = response.data as SuccessBySeller[]

      setBarData({
        labels: {
          categories: data.map(x => x.sellerName)
        },
        series: [
          {
            name: "Sucesso (%)",
            data: data.map(x => round(100 * x.deals / x.visited, 1)),
          },
        ],
      })
    })
  }, [])

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  };
  return (
    <Chart
      options={{ ...options, xaxis: barData.labels }}
      series={barData.series}
      type="bar"
      height="240"
    />
  );
};

export default BarChart;
