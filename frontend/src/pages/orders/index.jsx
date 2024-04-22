import React, { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { useGetAllOrdersQuery } from "services/orders";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useDeleteOrderMutation } from "services/orders";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getOrders, deleteOrderThunk } from "state/ordersSlice";

const getColumns = (deleteFunc) => {
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Ім'я",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Імейл",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Номер телефону",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "house",
      headerName: "ID Будинку",
      flex: 1,
    },
    {
      field: "seeHouse",
      headerName: "Додаткова інформація",
      width: 200,
      renderCell: (house) => {
        return (
          <Button
            color="secondary"
            onClick={() =>
              (window.location.href = `http://localhost:3001/houses/${house.row.house}`)
            }
          >
            {" "}
            ПЕРЕГЛЯНУТИ БУДИНОК
          </Button>
        );
      },
    },
    {
      field: "deleteHouse",
      headerName: "Видалення",
      width: 200,
      renderCell: (house) => {
        return (
          <Button color="error" onClick={() => deleteFunc(house.row._id)}>
            {" "}
            ВИДАЛИТИ
          </Button>
        );
      },
    },
  ];
  return columns;
};

const Orders = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetAllOrdersQuery({ page, pageSize, search });
  const [deleteOrder] = useDeleteOrderMutation();
  const dispatch = useDispatch();
  const handleDeleteOrder = async (_id) => {
    dispatch(deleteOrderThunk({ _id: _id }));
  };
  const columns = getColumns(handleDeleteOrder);
  useEffect(() => {
    const fetchAllOrders = async () => {
      const response = await axios.get("http://localhost:3004/orders");
      dispatch(getOrders(response.data.orders));
    };
    fetchAllOrders();
  }, []);
  const orders = useSelector((state) => state.orders.orders);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Закази на будинки" subtitle="Список заказів на будинки" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !orders}
          getRowId={(row) => row._id}
          rows={(orders && orders) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Orders;
