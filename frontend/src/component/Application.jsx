import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const Application = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / itemsPerPage));
    }, [data, itemsPerPage]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  if (loading) return <div class="loader-container ">
    <img src="./assets/img/1487.gif" alt="" />
  </div>
  if (error) return <p>Error: {error.message}</p>;

  return (

    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold pt-3 m-0"><span className="text-muted fw-light">Tables /</span> Basic Tables</h4>
        <hr className="my-3" />
        <div className="card">
          <div className="d-flex mb-2 px-4 pt-3 justify-content-between">
            <div className="table-title">
              <h5 className="fw-bold py-2">Application Report</h5>
            </div>
            <div className="download-buttons d-flex align-items-center">
              <button className='btn btn-primary me-2 p-2' onClick={exportExcel}>Excel</button>
              <button className='btn btn-primary me-2 p-2' onClick={exportPDF}>PDF</button>
              <div className="d-flex justify-content-end mb-2">
                <label className="me-2">Show:</label>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>

          <table id="user-group-table" className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className='fw-bold'>Application Name</th>
                <th className='fw-bold'>parameters</th>
                <th className='fw-bold'>Last Connection</th>
              </tr>
            </thead>
            <tbody className='border border-1'>
              <tr>
                <td><input type="text" class="form-control" name="applicationname" placeholder='Search Application Name' /></td>
                <td><input type="text" class="form-control" name="parameters" placeholder='Search parameters' /></td>
                <td><input type="text" class="form-control" name="lastconntection" placeholder='Search Last Connection' /></td>
              </tr>
              {/* {currentData.map((group, index) => (
                <tr className='border border-1' key={index}>
                  <td className='border border-1'><p className='m-0'>{group.application_name}</p></td>
                  <td className='border border-1'><p className='m-0'>{group.parameters}</p></td>
                  <td className='border border-1'><p className='m-0'>{group.last_connection}</p></td>

                </tr>
              ))} */}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination mb-3 justify-content-end mt-3 px-4">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePrevPage} aria-label="Previous" disabled={currentPage === 1}>
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleNextPage} aria-label="Next" disabled={currentPage === totalPages}>
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
       
      </div>


      <div className="content-backdrop fade" />
    </div>

  )
}

export default Application
