import axios from "../../config/axios";

export const getCategorias = async () => {
  const res = await axios.get("/categorias/obtener");
  return res.data;
};
export const getCategoriasAdmin = async () => {
  const res = await axios.get("/categorias/obtenerAdmin");
  return res.data;
};

export const crearCategoria = async (data) => {
  const res = await axios.post("/categorias/alta", data);
  return res.data;
};

export const actualizarCategoria = async (id, data) => {
  const res = await axios.put(`/categorias/modificar/${id}`, data);
  return res.data;
};

export const eliminarCategoria = async (id) => {
  const res = await axios.delete(`/categorias/baja/${id}`);
  return res.data;
};
