import axios from "../../config/axios";

export const getMetodosDePago = async () => {
  const res = await axios.get("/metodosDePago/obtener");
  return res.data;
};
export const getMetodosDePagoAdmin = async () => {
  const res = await axios.get("/metodosDePago/obtenerAdmin");
  return res.data;
};

export const crearMetodoDePago = async (data) => {
  const res = await axios.post("/metodosDePago/alta", data);
  return res.data;
};

export const actualizarMetodoDePago = async (id, data) => {
  const res = await axios.put(`/metodosDePago/modificar/${id}`, data);
  return res.data;
};

export const eliminarMetodoDePago = async (id) => {
  const res = await axios.delete(`/metodosDePago/baja/${id}`);
  return res.data;
};
