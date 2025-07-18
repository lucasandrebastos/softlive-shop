export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:cursor-pointer"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
