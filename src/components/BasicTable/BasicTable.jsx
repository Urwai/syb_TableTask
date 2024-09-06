import React, { useMemo, useState } from "react";
import "./BasicTable.css";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import mData from "../../MOCK_DATA.json";

const BasicTable = () => {
  const data = useMemo(() => mData, []);
  const columns = [
    {
      header: "ID",
      accessorKey: "id"
    },
    {
      header: "Name",
      columns: [
        {
          header: "First",
          accessorKey: "first_name"
        },
        {
          header: "Last",
          accessorKey: "last_name"
        },
      ],
    },
    {
      header: "Email",
      accessorKey: "email"
    },
    {
      header: "Gender",
      accessorKey: "gender"
    },
    {
      header: "IP Address",
      accessorKey: "ip_address"
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering , setFiltering] = useState("");
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel : getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter : filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange : setFiltering,
  });

  return (
    <div className="w3-container">
      <h1>React Table</h1>
      <input 
        className="input" 
        placeholder="Filter Table" 
        type="text" 
        value={filtering} 
        onChange={(e) => setFiltering(e.target.value)} 
      />
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : 
                    <div>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() && (
                        <span>
                          {header.column.getIsSorted() === "asc" ? " ↑" : " ↓"}
                        </span>
                      )}
                    </div>
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="pagination-controls">
        <button className="btn" onClick={() => table.setPageIndex(0)}>
          First Page
        </button>
        <button
          className="btn"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous Page
        </button>
        <button
          className="btn"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next Page
        </button>
        <button
          className="btn"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </button>

        <span className="page-info">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>


      </div>
    </div>
  );
};

export default BasicTable;
