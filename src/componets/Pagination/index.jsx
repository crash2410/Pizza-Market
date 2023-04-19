import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss';

function Pagination({currentPage, setCurrentPage}) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => setCurrentPage(e.selected)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;