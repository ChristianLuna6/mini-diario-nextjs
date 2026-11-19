"use client";
import { useEffect, useState } from "react";

export default function NoteModal({note, mode, onClose, onSave}) 
  
  {
  const [title, setTitle] = useState(note?.title || "");
  const [description, setDescription] = useState(
    note?.description || ""
  );

  useEffect(() => {
    setTitle(note?.title || "");
    setDescription(note?.description || "");
  }, [note]);

  if (!note) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    onSave({
      ...note,
      title: title.trim(),
      description: description.trim()
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar ventana"
        >
          ×
        </button>

        {mode === "view" ? (
          <>
            <span className="eyebrow">MI DIARIO</span>

            <h2 id="modal-title" className="modal-title">
              {note.title}
            </h2>

            <span className="note-date">{note.date}</span>

            <p className="full-note">{note.description}</p>

            <button
              type="button"
              className="modal-button"
              onClick={onClose}
            >
              Cerrar
            </button>
          </>
        ) : (
          <>
            <span className="eyebrow">ACTUALIZA TUS IDEAS</span>

            <h2 id="modal-title" className="modal-title">
              Editar nota
            </h2>

            <form className="edit-form" onSubmit={handleSubmit}>
              <label htmlFor="edit-title">Título</label>

              <input
                id="edit-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />

              <label htmlFor="edit-description">Contenido</label>

              <textarea
                id="edit-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={onClose}
                >
                  Cancelar
                </button>

                <button type="submit" className="modal-button">
                  Guardar cambios
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
