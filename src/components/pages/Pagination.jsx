import React from 'react'

const Pagination = ({passengerPerPage, totalPassengers, paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPassengers / passengerPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(numb => (
                    <li key={numb} className="page-item">
                        <a onClick={(e) => {e.preventDefault(); paginate(numb)}} href="!#" className="page-link">
                            {numb}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
