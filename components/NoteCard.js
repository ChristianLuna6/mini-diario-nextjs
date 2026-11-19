export default function NoteCard({ note, onView, onEdit, onDelete }) {
  return (
    <article className="note-card">
      <span className="note-date">{note.date}</span>

      <h3>{note.title}</h3>

      <p className="note-preview">{note.description}</p>

      <div className="note-actions">
        <button
          type="button"
          className="action-button view-button"
          onClick={() => onView(note)}
        >
          Ver nota
        </button>

        <button
          type="button"
          className="action-button edit-button"
          onClick={() => onEdit(note)}
        >
          Editar
        </button>

        <button
          type="button"
          className="action-button delete-button"
          onClick={() => onDelete(note)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
