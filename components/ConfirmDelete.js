export default function ConfirmDelete({
  note,
  onCancel,
  onConfirm
}) {
  if (!note) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <section
        className="confirm-dialog"
        onClick={(event) => event.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
      >
        <div className="confirm-icon">♡</div>

        <h2 id="delete-title">¿Eliminar esta nota?</h2>

        <p>
          Estás a punto de eliminar
          <strong> "{note.title}"</strong>.
          Esta acción no se puede deshacer.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            No, conservar
          </button>

          <button
            type="button"
            className="confirm-delete-button"
            onClick={onConfirm}
          >
            Sí, eliminar
          </button>
        </div>
      </section>
    </div>
  );
}
