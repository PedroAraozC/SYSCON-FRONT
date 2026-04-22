// src/components/Categorias/CategoriaModal.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import metodo_pago_default from "../../assets/metodo_pago_default.png";
import "../../index.css";
import EmojiInput from "../EmojiInput/EmojiInput";

export default function ModalMetodoDePago({
  open,
  onClose,
  onSave,
  metodo_pago,
}) {
  const [form, setForm] = useState({
    nombre_metodo_pago: "",
    habilita: "",
  });

  const [errors, setErrors] = useState({});

  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [open]);

  useEffect(() => {
    if (metodo_pago) {
      setForm(metodo_pago);
    } else {
      setForm({ nombre_metodo_pago: "", habilita: "" });
    }
    setErrors({});
  }, [metodo_pago, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.nombre_metodo_pago) newErrors.nombre_metodo_pago = "Requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disableAutoFocus
      disableEnforceFocus
    >
      {/* 🔹 Header */}
      <DialogTitle
        sx={{
          fontWeight: "bold",
          backgroundColor: "var(--surface)",
          color: "white",
        }}
      >
        {metodo_pago ? "Editar Categoria" : "Nuevo Categoria"}
      </DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          backgroundColor: "var(--surface)",
        }}
      >
        {/* 🔹 Imagen */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={metodo_pago_default}
            alt="metodo_pago"
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              border: "4px solid var(--surface)",
            }}
          />
        </Box>

        {/* 🔹 Formulario */}
        <Box display="flex" flexDirection="column" gap={4}>
          <Box
            sx={{
              display: "flex",
              alignContent: "space-between",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <TextField
              label="Nombre de el metodo de pago"
              name="nombre_metodo_pago"
              value={form.nombre_metodo_pago}
              onChange={handleChange}
              error={!!errors.nombre_metodo_pago}
              helperText={errors.nombre_metodo_pago}
              fullWidth
              autoFocus
              inputRef={inputRef}
              sx={{
                mb: 2,
                backgroundColor: "var(--surface)",
                color: "var(--on-surface)",

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
            <EmojiInput
              value={form.emoji}
              onChange={(emoji) => setForm({ ...form, emoji })}
              categoria={[
                { category: "travel_places", name: "Dinero y objetos" },
                { category: "objects", name: "Objetos" },
                { category: "symbols", name: "Símbolos" },
              ]}
              sx={{
                "& input": {
                  fontSize: "1.5rem",
                  textAlign: "center",
                },
              }}
            />
          </Box>
          <Box display="flex" gap={2}>
            <FormControlLabel
              sx={{
                color: "var(--text)",
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "var(--accent)",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "var(--accent)",
                },
              }}
              control={
                <Switch
                  checked={form.habilita === 1}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      habilita: e.target.checked ? 1 : 0,
                    })
                  }
                />
              }
              label="Habilitado"
            />
          </Box>
        </Box>
      </DialogContent>

      <Divider />

      {/* 🔹 Acciones */}
      <DialogActions
        sx={{
          p: 2,
          backgroundColor: "var(--surface)",
        }}
      >
        <Button
          onClick={onClose}
          sx={{ px: 3, fontWeight: "bold", color: "red" }}
        >
          Cancelar
        </Button>

        <Button
          variant="outlined"
          onClick={handleSubmit}
          sx={{
            px: 3,
            fontWeight: "bold",
          }}
        >
          {metodo_pago ? "Actualizar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
