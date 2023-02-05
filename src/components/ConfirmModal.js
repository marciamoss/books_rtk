const ConfirmModal = ({ setDeleteConfirm, deleteUserBook, book, confirmMessage}) => (
  <div>
      <div className="bg-slate-800 bg-opacity-10 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div className="bg-slate-900 rounded px-10 py-10 rounded-md text-center">
          <h1 className="text-sm mb-4 font-bold text-white">{confirmMessage}</h1>
          <button onClick={()=>{setDeleteConfirm(false);}} className="bg-red-500 px-4 py-2 rounded-md text-sm text-white">Cancel</button>
          <button onClick={()=>{setDeleteConfirm(false);deleteUserBook(book)}} 
            className="bg-blue-600 px-7 py-2 ml-2 rounded-md text-sm text-white font-semibold">Ok
          </button>
        </div>
      </div>
  </div>
);

export default ConfirmModal;