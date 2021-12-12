import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  CircularProgress,
} from '@material-ui/core';

import { EnhancedTableHead, TablePaginationActions } from '../../ui';
import { getTransactionsRequest } from '../../store/transactions/actions';

import { useStyles } from './styles';

export const EnhancedTable = ({ headCells }) => {
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = React.useState(0);
  const [emptyRows, setEmptyRows] = useState(0);

  const dispatch = useDispatch();

  const { transactions, pagination } = useSelector((state) => ({
    transactions: state.transaction.transactions,
    pagination: state.transaction.pagination,
  }));

  useEffect(() => {
    if (transactions.length) {
      const { page: currentPage, per_page, total: countAllItems } = pagination;

      // Material UI first page is 0
      const firstPage = currentPage - 1;
      const fiveRows = 5;
      const lastPage = Math.ceil(countAllItems / rowsPerPage);

      setPage(firstPage);
      setRowsPerPage(per_page);
      setTotal(countAllItems);

      if (lastPage !== currentPage) {
        if (countAllItems === 0) {
          setEmptyRows(5);
        } else {
          setEmptyRows(0);
        }
      } else if (lastPage === currentPage) {
        if (countAllItems % fiveRows || countAllItems === 0) {
          setEmptyRows(rowsPerPage - (countAllItems % rowsPerPage));
        } else {
          setEmptyRows(countAllItems % rowsPerPage);
        }
      }
    }
  }, [transactions, pagination, page, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    const getData = () => {
      dispatch(
        getTransactionsRequest({
          page: 1,
          perPage: rowsPerPage,
          orderBy,
          order,
        })
      );
    };

    getData();
  };

  const handleChangePage = (event, newPage) => {
    const pageForServer = newPage + 1;

    const getData = () => {
      dispatch(
        getTransactionsRequest({
          page: pageForServer,
          perPage: rowsPerPage,
          orderBy,
          order,
        })
      );
    };

    getData();

    setPage(newPage);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar className={classes.header}>
          <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
            Transaction History
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table className={classes.table} aria-labelledby='tableTitle' size={'medium'} aria-label='enhanced table'>
            <caption>The history of your transactions. Here you can see your transfers and transfers to you from other users.</caption>
            <EnhancedTableHead
              classes={classes}
              headCells={headCells}
              numSelected={0}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={0}
            />
            <TableBody>
              {!transactions.length ? (
                <TableRow style={{ height: 265 }}>
                  <TableCell colSpan={12} align='center'>
                    <CircularProgress className={classes.center} />
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((row) => {
                  const labelId = `enhanced-table-checkbox-${row.id}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell component='th' id={labelId} scope='row' align='left'>
                        {row.sender.name}
                      </TableCell>
                      <TableCell align='left'>{row.recipient.name}</TableCell>
                      <TableCell align='center'>{row.count}</TableCell>
                      <TableCell align='center'>{row.pw_count_resulted}</TableCell>
                      <TableCell align='right'>{row.date}</TableCell>
                    </TableRow>
                  );
                })
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} align='center'>
                    {total === 0 && 'You have no history.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component='div'
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </div>
  );
};
