"use client";

import { useState } from "react";

export default function NoteForm({ onAddNote, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    onAddNote({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      date: new Date().toLocaleDateString("es-MX")
    });

    setTitle("");
    setDescription("");

    if (onCancel) {
      onCancel();
    }
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título de tu nota"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <textarea
        placeholder="Escribe tus pensamientos..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />

      <div className="create-form-actions">
        <button type="submit">
          Guardar nota
        </button>

        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

