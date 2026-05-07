// src/pages/Developer.jsx
import MainLayout from "../layouts/MainLayout";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaNodeJs } from "react-icons/fa";
import {
  SiReact,
  SiMui,
  SiExpress,
  SiMysql,
  SiJsonwebtokens,
} from "react-icons/si";

const MotionPaper = motion(Paper);

export default function Developer() {
  const techIcons = {
    React: <SiReact color="#61DBFB" />,
    "Material UI": <SiMui color="#007FFF" />,
    "Node.js": <FaNodeJs color="#3C873A" />,
    Express: <SiExpress />,
    MySQL: <SiMysql color="#00758F" />,
    // JWT: <SiJsonwebtokens />,
  };
  const techColors = {
    React: "#61DBFB",
    "Material UI": "#007FFF",
    "Node.js": "#3C873A",
    Express: "#3e444e",
    MySQL: "#00758F",
    // JWT: <SiJsonwebtokens />,
  };

  return (
    <MainLayout>
      <Box
        sx={{
          maxWidth: "900px",
          margin: "0 auto",
          mt: 6,
        }}
      >
        <Paper
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          sx={{
            p: 4,
            background: "var(--surface)",
            borderRadius: "16px",
            // border: "1px solid var(--border)",
            // transition: "all 0.3s ease",
          }}
        >
          {/* HEADER */}
          <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
            <Avatar
              src="/Foto_Perfil.jpg"
              sx={{
                width: 120,
                height: 120,
                border: "3px solid var(--accent)",
                boxShadow: "0 0 25px var(--accent-dim)",
                transition: "0.3s",
                // "&:hover": {
                //   transform: "scale(1.05)",
                // },
              }}
            />

            <Box>
              <Typography
                sx={{
                  fontSize: "1.9rem",
                  fontWeight: "bold",
                  color: "var(--text)",
                }}
              >
                Aráoz Colombres Pedro Agustín
              </Typography>

              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  mb: 1,
                }}
              >
                Full Stack Developer
              </Typography>

              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  href="https://github.com/PedroAraozC"
                  target="_blank"
                  startIcon={<FaGithub />}
                  variant="outlined"
                  sx={{
                    borderColor: "var(--border)",
                    color: "var(--text)",
                    "&:hover": {
                      borderColor: "var(--accent)",
                      backgroundColor: "var(--surface2)",
                    },
                  }}
                >
                  GitHub
                </Button>

                <Button
                  href="https://www.linkedin.com/in/pedro-araoz-colombres/"
                  target="_blank"
                  startIcon={<FaLinkedin />}
                  variant="contained"
                  sx={{
                    backgroundColor: "#0A66C2",
                    "&:hover": {
                      backgroundColor: "#004182",
                    },
                  }}
                >
                  LinkedIn
                </Button>
              </Stack>
            </Box>
          </Box>

          {/* DESCRIPCIÓN */}
          <Box mt={5}>
            <Typography
              sx={{
                mt: 1.5,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              Sistema de gestión de stock y ventas diseñado para negocios,
              permitiendo administrar productos, controlar inventario en tiempo
              real y registrar ventas con impacto directo en el stock. Incluye
              dashboard con métricas clave y una interfaz optimizada para uso
              rápido tipo caja.
            </Typography>
          </Box>

          {/* TECNOLOGÍAS */}
          <Box>
            <Typography
              sx={{
                mt: 1,
                mb: 1.5,
                color: "var(--text)",
                fontWeight: "bold",
              }}
            >
              Tecnologías
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {[
                "React",
                "Material UI",
                "Node.js",
                "Express",
                "MySQL",
                // "JWT",
              ].map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  icon={techIcons[tech]}
                  sx={{
                    backgroundColor: "var(--surface2)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    transition: "0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: techColors[tech],
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* REPOS */}
          <Box mt={5}>
            <Typography
              sx={{
                mb: 2,
                mt: 2,
                color: "var(--text)",
                fontWeight: "bold",
              }}
            >
              Repositorios
            </Typography>

            <Stack spacing={1}>
              <Button
                href="https://github.com/PedroAraozC/CostCalculator-Front"
                target="_blank"
                startIcon={<SiReact />}
                sx={{
                  justifyContent: "flex-start",
                  color: "#61DBFB",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--surface2)",
                  "&:hover": {
                    backgroundColor: "var(--surface3)",
                  },
                }}
              >
                Frontend (React)
              </Button>

              <Button
                href="https://github.com/PedroAraozC/CostCalculator-Back"
                target="_blank"
                startIcon={<FaNodeJs />}
                sx={{
                  justifyContent: "flex-start",
                  color: "#3C873A",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--surface2)",
                  "&:hover": {
                    backgroundColor: "var(--surface3)",
                  },
                }}
              >
                Backend (Node.js)
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}
