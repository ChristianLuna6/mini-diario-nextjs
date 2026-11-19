"use client";

import { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard";
import NoteForm from "../../components/NoteForm";
import NoteModal from "../../components/NoteModal";
import ConfirmDelete from "../../components/ConfirmDelete";

const initialNotes = [
  {
    id: 1,
    title: "Un nuevo comienzo",
    description:
      "Hoy comienzo este pequeño espacio para organizar mis ideas.",
    date: "06/11/2026"
  },
  {
    id: 2,
    title: "Ideas bonitas",
    description:
      "Recordar que cada pequeño paso también cuenta.",
    date: "06/11/2026"
  }
];

export default function Notas() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Recuperar las notas guardadas
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("mini-diario-notes");

      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("No se pudieron recuperar las notas:", error);
    }

    setIsLoaded(true);

    // Abrir formulario si se llega desde el botón de Inicio
    if (window.location.hash === "#crear") {
      setShowCreateForm(true);

      window.history.replaceState(
        null,
        "",
        window.location.pathname
      );
    }
  }, []);

  // Guardar los cambios en localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mini-diario-notes", JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  // CREATE: agregar una nueva nota
  function addNote(newNote) {
    setNotes((previousNotes) => [newNote, ...previousNotes]);
  }

  // READ: abrir una nota completa
  function viewNote(note) {
    setSelectedNote(note);
    setModalMode("view");
  }

  // UPDATE: abrir el formulario de edición
  function editNote(note) {
    setSelectedNote(note);
    setModalMode("edit");
  }

  // UPDATE: guardar los cambios
  function updateNote(updatedNote) {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );

    setSelectedNote(null);
  }

  // DELETE: mostrar confirmación
  function askDeleteNote(note) {
    setNoteToDelete(note);
  }

  // DELETE: eliminar después de confirmar
  function deleteNote() {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== noteToDelete.id)
    );

    setNoteToDelete(null);
  }

  return (
    <section className="page-container">
      <div className="section-heading">
        <span className="eyebrow">MI ESPACIO</span>
        <h1>Mis notas</h1>
        <p>
          Guarda aquí tus pensamientos e ideas favoritas.
          Cada recuerdo merece un espacio especial.
        </p>
      </div>

      <div className="notes-heading">
        <div>
          <h2>Mis recuerdos escritos</h2>
          <p>Pequeñas ideas que quiero conservar.</p>
        </div>

        <span>
          {notes.length} {notes.length === 1 ? "nota" : "notas"}
        </span>
      </div>

      {notes.length > 0 ? (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onView={viewNote}
              onEdit={editNote}
              onDelete={askDeleteNote}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>♡</span>
          <h3>Tu diario está esperando nuevas ideas.</h3>
          <p>Escribe tu primera nota para comenzar.</p>
        </div>
      )}

      {/* Botón para crear una nueva nota */}
      <div className="add-note-container">
        <button
          type="button"
          className="add-note-button"
          onClick={() => setShowCreateForm(true)}
        >
          <span>+</span>
          <span>Nueva nota</span>
        </button>
      </div>

      {/* Ventana para crear una nota */}
      {showCreateForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateForm(false)}
        >
          <section
            className="modal-content create-note-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-note-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowCreateForm(false)}
              aria-label="Cerrar ventana"
            >
              ×
            </button>

            <span className="eyebrow">UN NUEVO RECUERDO</span>
            <h2 id="create-note-title" className="modal-title">
              Escribe una nueva nota
            </h2>

            <NoteForm
              onAddNote={addNote}
              onCancel={() => setShowCreateForm(false)}
            />
          </section>
        </div>
      )}

      {/* Ventana para visualizar o editar */}
      {selectedNote && (
        <NoteModal
          note={selectedNote}
          mode={modalMode}
          onClose={() => setSelectedNote(null)}
          onSave={updateNote}
        />
      )}

      {/* Confirmación para eliminar */}
      {noteToDelete && (
        <ConfirmDelete
          note={noteToDelete}
          onCancel={() => setNoteToDelete(null)}
          onConfirm={deleteNote}
        />
      )}
    </section>
  );
}
