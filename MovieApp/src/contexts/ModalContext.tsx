import { createContext, useContext, useState } from 'react'


const ModalContext = createContext({})

export function useModal(){
    return useContext(ModalContext)
}

export const ModalProvider = ({ children }: any) => {

    const [open, setOpen] = useState<boolean>(false)

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    const value = {
        open,
        handleOpen,
        handleClose,

    }

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider