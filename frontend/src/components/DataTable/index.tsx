import axios from "axios";
import Pagination from "components/Pagination";
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
  const [currentPage, setCurrentPage] = useState(data.number)
  const dataPerPage = 10

  useEffect(() => {
    axios.get(`${baseURL}/sales?page=${currentPage}&size=${dataPerPage}&sort=date,desc`).then((resp) => {
      setData(resp.data);
    });
  }, [currentPage]);

  function changePage(nextPage: boolean = true){
    if (nextPage === true) {
      setCurrentPage(c => c + 1)
    }else{
      setCurrentPage(c => c - 1)
    }
  }

  return (
    <>
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
                  <td>{formatLocalDate(data.date, "dd/MM/yyyy")}</td>
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
      <Pagination page={currentPage} first={data.first} last={data.last} changePage={changePage}/>
    </>
  );
};

export default DataTable;
