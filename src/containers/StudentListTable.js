import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function StudentListTable(props) {
    const { rows, onRowClick=null } = props

    const getHeaderMapping = (key) => {
        switch (key) {
            case 'ID':
                return 'Student Id';
            case 'dateOfBirth':
                return 'Date of Birth';
            case 'firstName':
                return 'First Name';
            case 'lastName':
                return 'Last Name';
            default:
                return key;
        }
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {
                            rows?.length && Object.keys(rows?.[0])?.map(col => {
                                return <TableCell align="left"><strong>{getHeaderMapping(col)}</strong></TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.length && rows.map((row, rowIndex) => (
                        <TableRow
                            onClick={() => onRowClick && onRowClick(row?.ID)}
                            key={rowIndex}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {
                                Object.keys(row).map(cell => {
                                    return <TableCell align="left">{row[cell]}</TableCell>
                                })
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}