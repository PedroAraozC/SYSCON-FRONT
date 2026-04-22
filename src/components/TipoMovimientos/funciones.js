import axios from "../../config/axios";

export const getTipoTipoMovimiento = async () => {
  const res = await axios.get("/tipoMovimientos/obtener");
  return res.data;
};
export const getTipoMovimientoAdmin = async () => {
  const res = await axios.get("/tipoMovimiento/obtenerAdmin");
  return res.data;
};

export const crearTipoMovimiento = async (data) => {
  const res = await axios.post("/tipoMovimiento/alta", data);
  return res.data;
};

export const actualizarTipoMovimiento = async (id, data) => {
  const res = await axios.put(`/tipoMovimiento/modificar/${id}`, data);
  return res.data;
};

export const eliminarTipoMovimiento = async (id) => {
  const res = await axios.delete(`/tipoMovimiento/baja/${id}`);
  return res.data;
};
