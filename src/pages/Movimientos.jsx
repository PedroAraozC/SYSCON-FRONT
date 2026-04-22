// src/pages/Movimientos.jsx
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Box, Typography, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../index.css";
import {
  getMovimientosStockAdmin,
  getMovimientosStock,
} from "../components/MovimientosStock/funciones";

export default function Movimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovimientos();
  }, []);

  const fetchMovimientos = async () => {
    try {
      const data = await getMovimientosStockAdmin();
      console.log(data.movimientos_stock);
      setMovimientos(data.movimientos_stock);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      field: "id_movimiento",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 80,
    },

    {
      field: "id_producto",
      headerName: "COD",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "nombre_producto",
      headerName: "Producto",
      headerAlign: "center",
      width: 500,
    },

    {
      field: "nombre_movimiento",
      headerName: "Tipo",
      headerAlign: "center",
      align: "center",

      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "ENTRADA" ? "success" : "error"}
          size="small"
        />
      ),
    },

    {
      field: "cantidad",
      headerName: "Cantidad",
      headerAlign: "center",
      align: "center",
      width: 100,
    },

    {
      field: "fecha_alta",
      headerName: "Fecha",
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params) => `${params.value?.slice(0, 10)}`,
    },
  ];

  return (
    <MainLayout>
      <Box
        sx={{
          // backgroundColor: "var(--surface)",
          maxWidth: "100%",
          width: "40%",
          alignSelf: "center",
          justifySelf: "center",
          // boxShadow: "0px 4px 20px rgba(112, 104, 104, 0.15)",
          borderRadius: "16px",
          p: 3,
          mb: 5,
          mt: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            color: "var(--on-surface)",
          }}
          mb={2}
        >
          Movimientos
        </Typography>
      </Box>

      <Box sx={{ pt: 3, height: 500 }}>
        <DataGrid
          rows={movimientos}
          getRowId={(row) => row.id_movimiento}
          columns={columns}
          loading={loading}
          pageSize={10}
          sx={{
            width: "fit-content",
            justifySelf: "center",
            alignSelf: "center",
            // 🔹 Base
            backgroundColor: "var(--surface)",
            color: "var(--on--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            fontFamily: "var(--mono)",

            // 🔹 Header
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "var(--surface2)",
              borderBottom: "1px solid var(--border)",
            },

            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "var(--surface2)", // 🔹 necesario (cada celda)
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              color: "var(--text-secondary)",
              backgroundColor: "transparent",
              fontWeight: 600,
              fontSize: "12px",
            },

            "& .MuiDataGrid-filler": {
              backgroundColor: "var(--surface)",
              borderBottom: "1px solid var(--border)",
            },

            "& .MuiDataGrid-filler--horizontal": {
              backgroundColor: "var(--surface2)",
            },
            // 🔹 Filas
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid var(--border)",
              transition: "background 0.15s",
              backgroundColor: "var(--surface)",
            },

            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "var(--surface2) !important",
            },

            "& .MuiDataGrid-row.Mui-selected:hover": {
              backgroundColor: "var(--surface3) !important",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
              backgroundColor: "transparent",
            },

            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
              backgroundColor: "transparent",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "var(--surface2)",
            },

            // 🔹 Celdas
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              fontSize: "13px",
            },

            // 🔹 Footer (paginación)
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            },

            // 🔹 Paginación botones
            "& .MuiTablePagination-root": {
              color: "var(--text-primary)",
            },

            // 🔹 Checkbox
            "& .MuiCheckbox-root": {
              color: "var(--text-secondary)",
            },

            // 🔹 Sin borde azul feo al seleccionar
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
          }}
        />
      </Box>
    </MainLayout>
  );
}
