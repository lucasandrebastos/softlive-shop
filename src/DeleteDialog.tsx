interface DeleteDialogProps {
  onSubmit: () => void;
}

export default function DeleteDialog({ onSubmit }: DeleteDialogProps) {
  return (
    <div className="layout-container flex h-full grow flex-col">
      <div className="flex flex-col py-5 flex-1">
        <h3 className="text-[#121416] text-2xl font-bold px-4 text-center pb-2 pt-5">
          Tem certeza que deseja excluir este produto?
        </h3>
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#dce8f3] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em] grow">
              <span className="truncate">Confirmar</span>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em] grow">
              <span className="truncate">Cancelar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
