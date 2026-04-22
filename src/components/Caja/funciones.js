import axios from "../../config/axios";

export const getVentas = async () => {
  const res = await axios.get("/venta/obtener");
  return res.data;
};
export const getVentasAdmin = async () => {
  const res = await axios.get("/venta/obtenerAdmin");
  return res.data;
};

export const crearVenta = async (data) => {
  const res = await axios.post("/venta/altaVenta", data);
  return res.data;
};

export const actualizarVenta = async (id, data) => {
  const res = await axios.put(`/venta/modificar/${id}`, data);
  return res.data;
};

export const eliminarVenta = async (id) => {
  const res = await axios.delete(`/venta/baja/${id}`);
  return res.data;
};
