import { Card, CardContent, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2,
});

export default function StatCard({
  title,
  value,
  color,
  loading,
  format, // "currency" | "number"
  delay
}) {
  const [displayValue, setDisplayValue] = useState(0);

  const isNumber = typeof value === "number";

  useEffect(() => {
    if (loading || !isNumber) {
      setDisplayValue(value);
      return;
    }

    let start = 0;

    const animate = () => {
      start += (value - start) * 0.08;

      if (Math.abs(value - start) < 0.01) {
        setDisplayValue(value);
        return;
      }

      setDisplayValue(Math.round(start * 100) / 100);
      requestAnimationFrame(animate);
    };

    animate();
  }, [value, loading, isNumber]);

  const renderValue = () => {
    if (!isNumber) return value;

    if (format === "currency") {
      return currency.format(displayValue);
    }

    return displayValue.toLocaleString("es-AR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Card
      sx={{
        width: "350px",
        height: "200px",
        borderLeft: `8px solid ${color}`,
        boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
        borderRadius: "10px",
        backgroundColor: "var(--surface)",
        color: "var(--text)",
        animation: `fadeIn 0.4s ease ${delay || 0}s forwards`,
        opacity: 0,
      }}
    >
      <CardContent>
        {loading ? (
          <>
            <Skeleton width="60%" height={30} />
            <Skeleton width="40%" height={80} />
          </>
        ) : (
          <>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "2rem",
                color: "var(--text-secondary)",
                borderBottom: `1px solid ${color}`,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: format !== "currency" ? "2.5rem" : "1.5rem",
                color: color,
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent:
                  format === "currency"
                    ? "center"
                    : format === "moneda"
                      ? "flex-end"
                      : "flex-start",
                fontFamily: "var(--mono)",
                minHeight: "100px",
              }}
            >
              {renderValue()}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
