import React from "react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  error: string | null;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  error,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-96">
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        {error && (
          <div className="mb-4  p-3 bg-red-100 border border-red-300 text-red-600 rounded text-sm">
            {error}
          </div>
        )}
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div className="flex flex-row justify-end gap-3">
        <button 
        onClick={onClose}
        className="flex-1 bg-gray-100 border-none rounded flex hover:shadow-button-secondary p-2 justify-center items-center active:shadow-(--shadow-button-active) duration-300 cursor-pointer">
            Cancel
        </button>
        <button
        onClick={onConfirm}
        className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 duration-300 cursor-pointer"
        >
            Delete
        </button>
      </div>
      </div>

      
    </div>
  );
};

export default DeleteAccountModal;
