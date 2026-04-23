import { useState, useEffect, useRef, useCallback } from "react";
import MainLayout from "../layouts/MainLayout";
import "../index.css";
import { getProductosAdmin } from "../components/Productos/funciones";
import { getCategoriasAdmin } from "../components/Categorias/funciones";
import { getMetodosDePagoAdmin } from "../components/MetodosDePago/funciones";
import { crearVenta } from "../components/Caja/funciones";
import { Box, Button } from "@mui/material";

export default function Caja() {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [catActiva, setCatActiva] = useState(0);
  const [descuento, setDescuento] = useState("");
  const [metodoPago, setMetodoPago] = useState(1);
  const [recibido, setRecibido] = useState("");
  const [toast, setToast] = useState({ msg: "", tipo: "", vis: false });
  const toastTimer = useRef(null);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [metodosDePago, setMetodosDePago] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategorias = async () => {
    try {
      const data = await getCategoriasAdmin();
      setCategorias(data.categorias);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };
  const fetchProductos = async () => {
    try {
      const data = await getProductosAdmin();
      setProductos(data.productos);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const fetchMetodosDePago = async () => {
    try {
      const data = await getMetodosDePagoAdmin();
      setMetodosDePago(data.metodo_pago);
    } catch (error) {
      console.error("Error al cargar métodos de pago:", error);
    }
  };
  useEffect(() => {
    fetchCategorias();
    fetchProductos();
    fetchMetodosDePago();
  }, []);

  const BILLETES = [500, 1000, 2000, 5000, 10000];

  const fmt = (n) => "$" + Math.round(n).toLocaleString("es-AR");
  // ── Helpers ──────────────────────────────────────────────────────────────
  const mostrarToast = useCallback((msg, tipo = "info") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, tipo, vis: true });
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, vis: false })),
      2300,
    );
  }, []);

  const subtotal = carrito.reduce((a, i) => a + i.precio_producto * i.qty, 0);
  const pctDesc = Math.min(Math.max(parseFloat(descuento) || 0, 0), 100);
  const montoDesc = Math.round(subtotal * (pctDesc / 100));
  const total = subtotal - montoDesc;
  const montoRecib = parseFloat(recibido) || 0;
  const vuelto = montoRecib - total;
  const itemsCount = carrito.reduce((a, i) => a + i.qty, 0);

  const productosFiltrados = productos.filter((p) => {
    const matchCat = catActiva === 0 || p.id_categoria === catActiva;
    const matchSearch = p.nombre_producto
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return matchCat && matchSearch;
  });

  // ── Acciones de carrito ───────────────────────────────────────────────────
  const agregarProducto = (prod) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id_producto === prod.id_producto);
      if (existe) {
        if (existe.qty >= prod.stock) {
          mostrarToast(`Máximo disponible: ${prod.stock}`, "error");
          return prev;
        }
        return prev.map((p) =>
          p.id_producto === prod.id_producto ? { ...p, qty: p.qty + 1 } : p,
        );
      }
      return [...prev, { ...prod, qty: 1 }];
    });
  };

  const cambiarCantidad = (id, delta) => {
    const prod = productos.find((p) => p.id_producto === id);
    setCarrito((prev) =>
      prev
        .map((p) => {
          if (p.id_producto !== id) return p;
          const nq = p.qty + delta;
          if (nq > prod.stock) {
            mostrarToast(`Máximo disponible: ${prod.stock}`, "error");
            return p;
          }
          return { ...p, qty: nq };
        })
        .filter((p) => p.qty > 0),
    );
  };

  const quitarItem = (id) =>
    setCarrito((prev) => prev.filter((p) => p.id_producto !== id));
  const limpiarCart = () => {
    setCarrito([]);
    setDescuento("");
    setRecibido("");
  };

  const cobrar = async () => {
    if (!carrito.length) return;
    if (metodoPago == 1 && montoRecib < total) {
      mostrarToast("Monto recibido insuficiente", "error");
      return;
    }
    setLoading(true);
    const body = {
      total,
      id_metodo_pago: metodoPago,
      productos: carrito.map((item) => ({
        id_producto: item.id_producto,
        cantidad: item.qty,
        precio_unitario: item.precio_producto,
      })),
    };

    try {
      const res = await crearVenta(body);
      if (res.message != "Venta registrada") throw new Error();
      mostrarToast(`Venta de ${fmt(total)} registrada ✓`, "success");
      limpiarCart();
      fetchProductos();
      setMetodoPago(1);
    } catch {
      mostrarToast("Error al registrar la venta", "error");
    } finally {
      setLoading(false);
    }
  };

  // ── Stock badge ───────────────────────────────────────────────────────────
  const stockBadge = (p) => {
    if (p.stock === 0)
      return <span className="stock-badge stock-none">Sin stock</span>;
    if (p.stock <= 3)
      return <span className="stock-badge stock-low">{p.stock} restantes</span>;
    return <span className="stock-badge stock-ok">Stock {p.stock}</span>;
  };

  return (
    <MainLayout>
      {/* Inyección de estilos scoped */}

      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 2,
          p: 2,
          boxSizing: "border-box",
        }}
      >
        {/* ════════════════ PANEL IZQUIERDO ════════════════ */}
        <Box
          className="pos-lef"
          sx={{ width: "75%", maxHeight: "80dvh", borderRadius: 2 }}
        >
          {/* Barra de búsqueda */}
          <div className="pos-topbar">
            <Box
              className="search-wrap"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
                mb: 2,
              }}
            >
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="pos-search"
                type="text"
                placeholder="Buscar producto o escanear código..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                autoFocus
              />
            </Box>
          </div>

          {/* Categorías */}
          <Box
            className="pos-cats"
            sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}
          >
            <button
              className={`cat-pill${catActiva === 0 ? " active" : ""}`}
              onClick={() => setCatActiva(0)}
            >
              Todos
            </button>

            {categorias.map((c) => (
              <button
                key={c.id_categoria}
                className={`cat-pill${catActiva === c.id_categoria ? " active" : ""}`}
                onClick={() => setCatActiva(c.id_categoria)}
              >
                {c.nombre_categoria}
              </button>
            ))}
          </Box>

          {/* Grilla de productos */}
          <div className="products-grid">
            {productosFiltrados.length === 0 && (
              <div className="no-results">Sin resultados para "{busqueda}"</div>
            )}
            {productosFiltrados.map((p) => (
              <div
                key={p.id_producto}
                className={`p-2 prod-card${p.stock === 0 ? " no-stock" : ""}`}
                onClick={() => agregarProducto(p)}
              >
                <div className="prod-emoji">{p.emoji}</div>
                <div className="prod-name">{p.nombre_producto}</div>
                <div className="prod-price">{fmt(p.precio_producto)}</div>
                {stockBadge(p)}
              </div>
            ))}
          </div>
        </Box>

        {/* ════════════════ PANEL DERECHO (CARRITO) ════════════════ */}
        <Box
          className="pos-right"
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: "80dvh",
            borderRadius: 2,
          }}
        >
          <div className="cart-header">
            <span>
              <span className="cart-title">Venta actual</span>
              <span className="items-count">{itemsCount} items</span>
            </span>
            <button
              className="clear-btn"
              onClick={limpiarCart}
              disabled={loading}
            >
              Limpiar <div className="ci-emoji">🗑️</div>
            </button>
          </div>

          {/* Items del carrito */}
          <div className="cart-items">
            {carrito.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">🛒</div>
                <div className="cart-empty-text">
                  Agregá productos para comenzar
                </div>
              </div>
            ) : (
              carrito.map((item) => (
                <div key={item.id_producto} className="cart-item">
                  <div className="ci-emoji">{item.emoji}</div>
                  <div className="ci-info">
                    <div className="ci-name">{item.nombre_producto}</div>
                    <div className="ci-unit">
                      {fmt(item.precio_producto)} c/u
                    </div>
                  </div>
                  <div className="qty-ctrl">
                    <button
                      className="qty-btn"
                      onClick={() => cambiarCantidad(item.id_producto, -1)}
                      disabled={loading}
                    >
                      −
                    </button>
                    <span className="qty-num">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => cambiarCantidad(item.id_producto, +1)}
                      disabled={loading}
                    >
                      +
                    </button>
                  </div>
                  <div className="ci-subtotal">
                    {fmt(item.precio_producto * item.qty)}
                  </div>
                  <button
                    className="del-btn"
                    onClick={() => quitarItem(item.id_producto)}
                    disabled={loading}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer: solo cuando hay items */}
          {carrito.length > 0 && (
            <div className="cart-footer">
              {/* Descuento */}
              <div className="discount-row">
                <span className="discount-label">Desc.%</span>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  value={descuento}
                  onChange={(e) => setDescuento(e.target.value)}
                />
                {[10, 15, 20].map((d) => (
                  <button
                    key={d}
                    className={`disc-quick${pctDesc === d ? " active" : ""}`}
                    onClick={() => setDescuento(pctDesc === d ? "" : String(d))}
                  >
                    {d}%
                  </button>
                ))}
              </div>

              {/* Totales */}
              <div className="totals-section">
                <div className="tot-row">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                {pctDesc > 0 && (
                  <div className="tot-row disc-line">
                    <span>Descuento ({pctDesc}%)</span>
                    <span>−{fmt(montoDesc)}</span>
                  </div>
                )}
                <hr className="tot-divider" />
                <Box
                  className="total-final"
                  sx={{
                    backgroundColor: "var(--surface2)",
                    width: "100%",
                    p: 1,
                    borderRadius: 2,
                  }}
                >
                  <span className="total-label">Total</span>
                  <span className="total-amount">{fmt(total)}</span>
                </Box>
                <hr className="tot-divider" />
              </div>

              {/* Método de pago */}
              <div className="pay-section">
                <Box
                  className="pay-methods"
                  sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 1 }}
                >
                  {metodosDePago.map((m) => (
                    <Button
                      sx={{ borderRadius: 3, width: "150px" }}
                      key={m.id_metodo_pago}
                      className={`pay-btn${metodoPago === m.id_metodo_pago ? " selected" : ""}`}
                      onClick={() => {
                        setMetodoPago(m.id_metodo_pago);
                        setRecibido("");
                      }}
                    >
                      <span>{m.emoji}</span>
                      <span>{m.nombre_metodo_pago}</span>
                    </Button>
                  ))}
                </Box>

                {/* Sección efectivo */}
                {metodoPago == 1 && (
                  <div className="cash-section">
                    <div className="cash-row">
                      <label>Recibido</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={recibido}
                        onChange={(e) => setRecibido(e.target.value)}
                        min="0"
                      />
                    </div>
                    <div className="bills-row">
                      {BILLETES.map((b) => (
                        <button
                          key={b}
                          className="bill-btn"
                          onClick={() => setRecibido(String(b))}
                        >
                          {fmt(b)}
                        </button>
                      ))}
                      <button
                        className="bill-btn exact-btn"
                        onClick={() => setRecibido(String(total))}
                      >
                        Exacto
                      </button>
                    </div>
                    {montoRecib >= total && total > 0 && (
                      <div className="vuelto-box">
                        <span className="vuelto-label">Vuelto</span>
                        <span className="vuelto-amount">{fmt(vuelto)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Botón cobrar */}
              <button
                className="cobrar-btn"
                onClick={cobrar}
                disabled={carrito.length === 0 || loading}
              >
                {loading ? (
                  <>
                    <span className="cobrar-spinner" /> Procesando...
                  </>
                ) : (
                  `Cobrar ${fmt(total)}`
                )}
              </button>
            </div>
          )}

          {carrito.length === 0 && (
            <div style={{ padding: "14px 18px" }}>
              <button className="cobrar-btn" disabled>
                Cobrar
              </button>
            </div>
          )}
        </Box>
      </Box>

      {/* Toast de notificaciones */}
      <div
        className={`pos-toast${toast.vis ? " show" : ""}${toast.tipo ? " " + toast.tipo : ""}`}
      >
        {toast.msg}
      </div>
    </MainLayout>
  );
}
