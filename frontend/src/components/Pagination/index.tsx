interface PaginationProps {
  page: number;
  first: boolean;
  last: boolean;
  changePage: Function;
}

const Pagination = ({ page, first, last, changePage }: PaginationProps) => {
  return (
    <>
      <div className="row d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${first &&'disabled'}`}>
              <button className="page-link" onClick={() => changePage(false)}>Anterior</button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">{page + 1}</span>
            </li>
            <li className={`page-item ${last &&'disabled'}`}>
              <button className="page-link" onClick={() => changePage()}>Próxima</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
