// src/components/Productos/ProductoModal.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Switch,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import producto_default from "../../assets/producto_default.png";
import "../../index.css";
import EmojiInput from "../../components/EmojiInput/EmojiInput";
import Select from "@mui/material/Select";
import { getCategorias, getCategoriasAdmin } from "../Categorias/funciones";

export default function ModalProducto({ open, onClose, onSave, producto }) {
  const [form, setForm] = useState({
    nombre_producto: "",
    precio_producto: "",
    emoji: "",
    id_categoria: "",
    habilita: "",
    stock_minimo: "",
  });

  console.log(producto, "producto");

  const [categorias, setCategorias] = useState([]);
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
    const fetchCategorias = async () => {
      try {
        const data = await getCategoriasAdmin();
        setCategorias(data.categorias); // 🔥 IMPORTANTE
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorias();

    if (producto) {
      setForm(producto);
    } else {
      setForm({
        nombre_producto: "",
        precio_producto: "",
        emoji: "",
        id_categoria: "",
        stock_minimo: "",
        habilita: 1,
      });
    }

    setErrors({});
  }, [producto, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.nombre_producto) newErrors.nombre_producto = "Requerido";
    if (!form.emoji) newErrors.emoji = "Requerido";
    if (!form.id_categoria) newErrors.id_categoria = "Requerido";
    if (!form.precio_producto || form.precio <= 0)
      newErrors.precio_producto = "Precio inválido";
    if (form.stock_minimo < 0) newErrors.stock_minimo = "Stock inválido";

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
        {producto ? "Editar Producto" : "Nuevo Producto"}
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
            src={producto_default}
            alt="producto"
            sx={{
              width: 120,
              height: 120,
              zoom:"200%",
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
              label="Nombre del producto"
              name="nombre_producto"
              value={form.nombre_producto}
              onChange={handleChange}
              error={!!errors.nombre_producto}
              helperText={errors.nombre_producto}
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
              categoria={[{ category: "food_drink", name: "Comida" }]}
              sx={{
                "& input": {
                  fontSize: "1.5rem",
                  textAlign: "center",
                },
              }}
            />
          </Box>

          <Box display="flex" gap={2}>
            <Box
              sx={{
                display: "flex",
                alignContent: "space-between",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <TextField
                label="Precio"
                name="precio_producto"
                type="number"
                value={form.precio_producto}
                onChange={handleChange}
                error={!!errors.precio_producto}
                helperText={errors.precio_producto}
                fullWidth
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
              <TextField
                label="Stock Minimo"
                name="stock_minimo"
                type="number"
                value={form.stock_minimo}
                onChange={handleChange}
                error={!!errors.stock_minimo}
                helperText={errors.stock_minimo}
                fullWidth
                sx={{
                  mb: 2,
                  width: "auto",
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
            </Box>
            <Box
              sx={{
                display: "flex",
                alignContent: "space-between",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel
                  sx={{
                    color: "var(--text-secondary)",
                    "&.Mui-focused": {
                      color: "var(--accent)",
                    },
                  }}
                >
                  Categoría
                </InputLabel>

                <Select
                  value={form.id_categoria || ""}
                  onChange={(e) =>
                    setForm({ ...form, id_categoria: e.target.value })
                  }
                  label="Categoría"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "var(--surface2) !important",
                        color: "var(--text)",
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: "var(--surface2)",
                    borderRadius: "10px",
                    color: "var(--text)",
                    fontFamily: "var(--mono)",

                    // 🔹 borde
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--border)",
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--border-strong)",
                    },

                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--accent)",
                    },

                    // 🔹 texto seleccionado
                    "& .MuiSelect-select": {
                      color: "var(--text)",
                      fontFamily: "var(--mono)",
                    },

                    // 🔹 flecha
                    "& .MuiSvgIcon-root": {
                      color: "var(--text-secondary)",
                    },
                  }}
                >
                  {categorias.map((cat) => (
                    <MenuItem
                      key={cat.id_categoria}
                      value={cat.id_categoria}
                      sx={{
                        fontFamily: "var(--mono)",
                        fontSize: "14px",
                        backgroundColor: "var(--surface2)",
                        color: "var(--text)",

                        "&:hover": {
                          backgroundColor: "var(--surface3)",
                        },

                        "&.Mui-selected": {
                          backgroundColor: "var(--accent-dim)",
                        },
                      }}
                    >
                      {cat.nombre_categoria}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

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
          {producto ? "Actualizar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
