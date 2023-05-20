import { useState, useEffect, createContext, useContext } from "react";
import ModulesService from "../../services/ModulesService";

const ContextStorage = createContext();

function useDrawing() {
    return useContext(ContextStorage)
}

function ProviderDrawing({ children }) {
    const [current, selectIt] = useState('')
    const [modules, setModules] = useState([])

    useEffect(()=>{
        (async ()=>{
            const modulesResponse = await getModules()
            setModules( prev => modulesResponse )
        })()
    },[])

    const getModules = async () => {
        return await ModulesService.getAll()
    }


    return <ContextStorage.Provider value={{modules, current, selectIt}}>{children}</ContextStorage.Provider>
}

export { useDrawing, ProviderDrawing }