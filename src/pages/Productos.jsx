// src/pages/Productos.jsx
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ModalProducto from "../components/Productos/ModalProducto";
import AddIcon from "@mui/icons-material/Add";
import ModalStock from "../components/Productos/ModalStock";

import {
  getProductos,
  getProductosAdmin,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../components/Productos/funciones";

import {
  actualizarMovimientoStock,
  crearMovimientoStock,
} from "../components/MovimientosStock/funciones";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const [openStock, setOpenStock] = useState(false);
  const [productoStock, setProductoStock] = useState(null);

  const fetchProductos = async () => {
    try {
      const data = await getProductosAdmin();
      console.log(data);
      setProductos(data?.productos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleNuevo = () => {
    setSelectedProducto(null);
    setOpenModal(true);
  };

  const handleEditar = (producto) => {
    setSelectedProducto(producto);
    setOpenModal(true);
  };

  const handleAgregarStock = (producto) => {
    setProductoStock(producto);
    setOpenStock(true);
  };

  const handleSave = async (data) => {
    try {
      if (selectedProducto) {
        await actualizarProducto(selectedProducto.id_producto, data);
      } else {
        await crearProducto(data);
      }

      setOpenModal(false);
      fetchProductos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStock = async (data, cant) => {
    try {
      const payload = {
        ...data,
        id_tipo: 1,
        cantidad: cant,
      };

      await crearMovimientoStock(payload);

      setOpenStock(false);
      fetchProductos();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      field: "id_producto",
      headerName: "COD",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => `${params.value?.toLocaleString()}`,
    },
    {
      field: "nombre_producto",
      headerName: "Nombre",
      width: 500,
      headerAlign: "center",
    },
    {
      field: "emoji",
      headerName: "Emoji",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "precio_producto",
      headerName: "Precio",
      headerAlign: "center",
      align: "right",
      renderCell: (params) => `$${params.value?.toLocaleString()}`,
    },
    {
      field: "stock",
      headerName: "Stock",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stock_minimo",
      headerName: "Stock Min.",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "habilita",
      headerName: "Habilitado",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (params.value ? "Si" : "No"),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      headerAlign: "center",
      renderCell: (params) => (
        <Button onClick={() => handleEditar(params.row)}>Editar</Button>
      ),
    },
    {
      field: "stockAcciones",
      headerName: "Stock",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleAgregarStock(params.row)}
        >
          + Stock
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <Box
        sx={{
          backgroundColor: "transparent",
          maxWidth: "100%",
          width: "40%",
          alignSelf: "center",
          justifySelf: "center",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
          borderRadius: "16px",
          p: 3,
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
            fontFamily: "var(--mono)",
          }}
          mb={2}
        >
          Productos
        </Typography>
      </Box>

      <Box
        sx={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          alignSelf: "center",
          justifySelf: "center",
        }}
      >
        <Box mb={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "var(--surface)",
              color: "var(--on-surface)",
              borderRadius: 3,
              mb: 3,
              "&:hover": {
                backgroundColor: "var(--text)",
                color: "var(--surface)",
              },
            }}
            onClick={handleNuevo}
          >
            <AddIcon />
          </Button>
        </Box>
        <DataGrid
          rows={productos}
          getRowId={(row) => row.id_producto}
          columns={columns}
          loading={loading}
          pagination
          pageSizeOptions={[5, 10, 20, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
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

      <ModalProducto
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        producto={selectedProducto}
      />
      <ModalStock
        open={openStock}
        onClose={() => setOpenStock(false)}
        onSave={handleStock}
        producto={productoStock}
      />
    </MainLayout>
  );
}
