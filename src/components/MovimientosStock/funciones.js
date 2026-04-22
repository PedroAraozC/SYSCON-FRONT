import axios from "../../config/axios";

export const getMovimientosStock = async () => {
  const res = await axios.get("/movimientosStock/obtener");
  return res.data;
};
export const getMovimientosStockAdmin = async () => {
  const res = await axios.get("/movimientosStock/obtenerAdmin");
  return res.data;
};

export const crearMovimientoStock = async (data) => {
  const res = await axios.post("/movimientosStock/alta", data);
  return res.data;
};

export const actualizarMovimientoStock = async (id, data) => {
  const res = await axios.put(`/movimientosStock/modificar/${id}`, data);
  return res.data;
};

export const eliminarMovimientoStock = async (id) => {
  const res = await axios.delete(`/movimientosStock/baja/${id}`);
  return res.data;
};
