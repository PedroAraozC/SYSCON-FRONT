import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/Cards/StatCard";
import { getDashboardStats } from "../components/Dashboard/funciones";
import { getMovimientosStockAdmin } from "../components/MovimientosStock/funciones";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    ventasHoy: 0,
    bajoStock: 0,
    movimientosHoy: 0,
    masVendido: "-",
  });
  const [movimientos, setMovimientos] = useState([]);

  // ✅ fmt que maneja strings
  const fmt = (n) =>
    "$" +
    (Number(n) || 0).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      console.log(data);

      console.log("ventasHoy:", data.ventasHoy, typeof data.ventasHoy);
      console.log("masVendido:", data.masVendido);
      setStats(data);
    } catch (error) {
      console.error("Error al obtener stats:", error);
    }
  };

  const fetchMovimientos = async () => {
    try {
      const data = await getMovimientosStockAdmin();
      setMovimientos(data.movimientos_stock.slice(0, 4));
    } catch (error) {
      console.error("Error al obtener movimientos:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchMovimientos();
  }, []);

  return (
    <MainLayout>
      <Typography
        sx={{
          fontSize: "3rem",
          fontWeight: "italic",
          textAlign: "center",
          color: "var(--primary)",
        }}
      >
        SYSCON
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: "italic",
          textAlign: "center",
          mb: 3,
          mt: -1,
          color: "var(--primary)",
        }}
      >
        (Sistema Contable de Stock)
      </Typography>

      {/* Cards */}
      <Grid
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <Grid item xs={12} md={3}>
          <StatCard
            title="Ventas hoy"
            value={fmt(stats.ventasHoy)}
            color="#2e7d32"
            // format="currency"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Bajo stock"
            value={stats.bajoStock}
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Movimientos hoy"
            value={stats.movimientosHoy}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Más vendido"
            value={
              stats?.masVendido
                ? `${stats?.masVendido.emoji} ${stats?.masVendido.nombre_producto}`
                : "-"
            }
            color="#7b1fa2"
            format="currency"
          />
        </Grid>
      </Grid>

      {/* Últimos movimientos */}
      <Box sx={{ mt: 8 }}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: "var(--surface)",
            color: "var(--on-surface)",
          }}
        >
          <Typography variant="h6" mb={2}>
            Últimos movimientos
          </Typography>
          <List>
            {movimientos.map((mov, index) => (
              <Box key={mov.id_movimiento}>
                <ListItem
                  secondaryAction={
                    <Chip
                      label={mov.nombre_movimiento}
                      color={
                        mov.nombre_movimiento === "ENTRADA"
                          ? "success"
                          : "error"
                      }
                      size="small"
                    />
                  }
                >
                  <ListItemIcon>
                    {mov.nombre_movimiento === "ENTRADA" ? (
                      <ArrowUpwardIcon color="success" />
                    ) : (
                      <ArrowDownwardIcon color="error" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={mov.nombre_producto}
                    secondary={
                      <span style={{ color: "rgba(255,255,255,0.7)" }}>
                        Cantidad: {mov.cantidad} •{" "}
                        {mov.fecha_alta?.slice(0, 10)}
                      </span>
                    }
                  />
                </ListItem>
                {index < movimientos.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      </Box>
    </MainLayout>
  );
}
