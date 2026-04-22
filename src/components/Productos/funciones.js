import axios from "../../config/axios";

export const getProductos = async () => {
  const res = await axios.get("/productos/obtener");
  return res.data;
};
export const getProductosAdmin = async () => {
  const res = await axios.get("/productos/obtenerAdmin");
  return res.data;
};

export const crearProducto = async (data) => {
  const res = await axios.post("/productos/alta", data);
  return res.data;
};

export const actualizarProducto = async (id, data) => {
  const res = await axios.put(`/productos/modificar/${id}`, data);
  return res.data;
};

export const eliminarProducto = async (id) => {
  const res = await axios.delete(`/productos/baja/${id}`);
  return res.data;
};
