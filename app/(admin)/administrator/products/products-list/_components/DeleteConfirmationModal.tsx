import { AlertTriangle, Loader, Trash2 } from "lucide-react";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  productTitle,
  isDeleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productTitle: string;
  isDeleting: boolean;
}) => {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-100 flex items-center justify-center bg-[#fcbabacc] min-h-screen text-main-text py-10 px-3 backdrop-blur-sm">
      <div className="relative bg-white rounded shadow-shadow-auth-form max-h-[calc(100vh-80px)] w-full flex flex-col px-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Confirm Deletion</h3>
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete the product &quot;{productTitle}
            &quot;?
          </p>
          <div className="flex items-start gap-2 text-sm text-red-600 mb-6">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <p>
              This Action cannot be undone! Product will be permanently deleted.
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {isDeleting ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
