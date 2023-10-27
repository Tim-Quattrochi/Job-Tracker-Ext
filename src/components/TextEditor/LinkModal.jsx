import React from "react";
import "./modal.css";

import { Modal } from "./Modal";

export function LinkModal({
  url,
  closeModal,
  onChangeUrl,
  onSaveLink,
  onRemoveLink,
  ...rest
}) {
  return (
    <Modal {...rest}>
      <h2 className="modal-title">Edit link</h2>
      <button
        className="modal-close"
        type="button"
        onClick={closeModal}
      >
        X
      </button>
      <input
        className="border-solid border-primary-600 border mb-3 py-2 px-5 w-full
    rounded-lg text-gray-700"
        autoFocus
        value={url}
        onChange={onChangeUrl}
      />
      <div className="modal-buttons">
        <button
          className="w-15 p-2 text-base bg-red text-white rounded-lg"
          type="button"
          onClick={onRemoveLink}
        >
          Remove
        </button>
        <button
          className="w-14 p-2 text-base font-inter bg-primary-500 text-white rounded-lg"
          type="button"
          onClick={onSaveLink}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
