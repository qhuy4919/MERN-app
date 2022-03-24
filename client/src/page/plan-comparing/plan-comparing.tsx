import React from 'react'
import { useTable, useExpanded } from 'react-table'
import { makeData } from './data-generate';
import './plan-comparing.scss';
///TODOLIST
/*
** 1. mergeClass function
*/



export function ComparingTable() {
    const data = React.useMemo(() => makeData(5,5), []);
  
    const columns: any = React.useMemo(
        () => [
          {
            // Build our expander column
            id: 'expander', // Make sure it has an ID
            Cell: ({ row }) =>
              // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
              // to build the toggle for expanding a row
              row.canExpand ? (
                <span
                  {...row.getToggleRowExpandedProps({
                    style: {
                      // We can even use the row.depth property
                      // and paddingLeft to indicate the depth
                      // of the row
                      paddingLeft: `${row.depth * 2}rem`,
                    },
                  })}
                >
                  {row.isExpanded ? '👇' : '👉'}
                </span>
              ) : null,
          },
          {
            Header: 'Info',
            columns: [
              {
                Header: 'Column 1',
                accessor: 'year', // accessor is the "key" in the data
              },
              {
                Header: 'Column 2',
                accessor: 'dental',
              },
              {
                Header: 'Column 3',
                accessor: 'hearing',
              },
              {
                Header: 'Column 4',
                accessor: 'monthlyPremium',
              },
              {
                Header: 'Column 5',
                accessor: 'servicArea',
              },
              {
                Header: 'Column 6',
                accessor: 'vision',
              },
              {
                Header: 'Column 7',
                accessor: 'temp',
              },
            ],
          },
        ]
        ,[]
      )
    
    const tableInstance: any = useTable({ columns, data}, useExpanded);

    const { 
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state: { expanded },
    } =  tableInstance;

    return (
        <div className='plan-comparing-table'>
        <table {...getTableProps()} className='table-panel'>
            <thead>
                {
                    headerGroups.map((headerGroup: any) => 
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps()}
                            style={{
                            borderBottom: 'solid 3px red',
                            background: 'aliceblue',
                            color: 'black',
                            fontWeight: 'bold',
                            }}
                        >
                            {column.render('Header')}
                        </th>
                        ))}
                      </tr>
                    )
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row:any ) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell: any) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
    );
}
