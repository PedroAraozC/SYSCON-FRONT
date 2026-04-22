// src/components/Productos/StockModal.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
// import {actualizarTipoMovimiento} from "../TipoMovimientos/funciones"

export default function ModalStock({ open, onClose, onSave, producto }) {
  const [cantidad, setCantidad] = useState("");
  // const [tipo, setTipo] = useState([]);

  useEffect(() => {
    setCantidad("");
  }, [open]);

  const handleSubmit = () => {
    if (!cantidad || cantidad <= 0) return;
    onSave(producto, Number(cantidad));
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      disableAutoFocus
      disableEnforceFocus
    >
      <DialogTitle sx={{ backgroundColor: "var(--surface)", color: "white" }}>
        Agregar Stock
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          justifyContent: "space-around",
          backgroundColor: "var(--surface)",
          color: "white",
        }}
      >
        <Typography
          sx={{
            m: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Producto: <b>{producto?.nombre_producto}</b>
        </Typography>

        <Box
          sx={{
            display: "flex",
            p: 2,
          }}
        >
          <TextField
            label="Cantidad a ingresar"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            fullWidth
            autoFocus
            inputRef={inputRef}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "var(--surface2)",
                borderRadius: "10px",
                color: "var(--text)",
                fontFamily: "var(--font)",

                "& fieldset": {
                  borderColor: "var(--border)",
                },

                "&:hover fieldset": {
                  borderColor: "var(--border-strong)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "var(--accent)",
                },
              },

              "& .MuiInputLabel-root": {
                color: "var(--text-secondary)",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--accent)",
              },

              "& input": {
                color: "var(--text)",
                fontFamily: "var(--mono)",
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          backgroundColor: "var(--surface)",
        }}
      >
        <Button onClick={onClose} sx={{ color: "red" }}>
          Cancelar
        </Button>
        <Button variant="outlined" onClick={handleSubmit}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
