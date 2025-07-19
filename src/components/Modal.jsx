import React, {createContext, useState, useContext} from 'react'
import {createPortal} from "react-dom";
import { IoCloseSharp } from "react-icons/io5";

export const ModalContext = createContext(null);

function Modal({children}) {
    const [openName, setOpenName] = useState("");

    const contextValue = {
        openName,
        openModal: (name) => setOpenName(name),
        closeModal: () => setOpenName("")
    }

  return (
    <div>
        <ModalContext.Provider value={contextValue}>
            {children}
        </ModalContext.Provider>
    </div>
  )
}

const Open = function ({children, name}) {
    const {openModal} = useContext(ModalContext);
    return (
        <div onClick={() => openModal(name)} className="">
            {children}
        </div>
    )
}

const Window = function ({children, opens, title}) {
    const {closeModal, openName} = useContext(ModalContext);

    if (!(openName === opens)) return;
    return createPortal(
        <div className="overflow-y-scroll bg-black/70 backdrop-blur-sm fixed inset-0 flex items-start justify-center p-4">
            <div className="rounded w-xl bg-white text-neutral-900 p-6 flex flex-col gap-y-2">
                <div className="flex justify-between items-end">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={closeModal} className="border-2 rounded p-1.5 cursor-pointer">
                        <IoCloseSharp size={25} />
                    </button>
                </div>
                <hr className="w-full" />
                {children}
            </div>
        </div>,
        document.body
    )
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal