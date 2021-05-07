import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSum } from "types/sale";
import { baseURL } from "utils/requests";
// import { Container } from './styles';

interface ChartData {
  series: number[];
  labels: string[];
}

const DonutChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    series: [],
  });

  useEffect(() => {
    loadData()
  }, []);

  function loadData(){
    axios.get(`${baseURL}/sales/sumbyseller`).then((response) => {
      const data = response.data as SaleSum[];
      const series = data.map((x) => x.sum);
      const labels = data.map((x) => x.sellerName);

      setChartData({ labels, series });
    });
  }

  const options = {
    legend: {
      show: true,
    },
  };
  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
};

export default DonutChart;
