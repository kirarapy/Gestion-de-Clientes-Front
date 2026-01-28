"use client";

import { useState, useEffect } from "react";

type Cliente = {
  nombre: string;
  email: string;
  estado: string;
  createdAt: string;
};

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    estado: "Activo",
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Simular carga
  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nombre || !form.email) {
      alert("Nombre y email son obligatorios");
      return;
    }

    setClientes([
      ...clientes,
      {
        ...form,
        createdAt: new Date().toLocaleDateString(),
      },
    ]);

    setForm({ nombre: "", email: "", estado: "Activo" });
  }

  function handleDelete(index: number) {
    setClientes(clientes.filter((_, i) => i !== index));
  }

  const filtrados = clientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p style={{ padding: 20 }}>Cargando clientes...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Gestión de Clientes</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <br />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br />

        <select name="estado" value={form.estado} onChange={handleChange}>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>

        <br /><br />
        <button type="submit">Agregar cliente</button>
      </form>

      <hr />

      <input
        placeholder="Buscar por nombre o email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Listado</h3>

      {filtrados.length === 0 && <p>No hay clientes</p>}

      {filtrados.map((c, i) => (
        <div key={i}>
          <b>{c.nombre}</b> – {c.email} – {c.estado} – {c.createdAt}
          <button onClick={() => handleDelete(i)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
