import axios from "axios";
import { da } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { salePage } from "types/sale";
import { formatLocalDate } from "utils/format";
import { baseURL } from "utils/requests";

const DataTable: React.FC = () => {
  const [data, setData] = useState<salePage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    axios.get(`${baseURL}/sales?page=0&size=10&sort=date,desc`).then((resp) => {
      setData(resp.data);
    });
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Data</th>
            <th>Vendedor</th>
            <th>Clientes visitados</th>
            <th>Negócios fechados</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.content?.map((data) => {
            return (
              <tr key={data.id}>
                <td>{formatLocalDate(data.date, 'dd/MM/yyyy')}</td>
                <td>{data.seller.name}</td>
                <td>{data.visited}</td>
                <td>{data.deals}</td>
                <td>{data.amount.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
