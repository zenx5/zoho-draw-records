import { useState, useEffect, createContext, useContext } from "react";
import ModulesService from "../../services/ModulesService";

const ContextStorage = createContext();

function useDrawing() {
    return useContext(ContextStorage)
}

function ProviderDrawing({ children }) {
    const [drawings, setDrawing] = useState([])
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

    const addDrawing = (item) => {
        setDrawing( prev => ([...prev, item]) )
        // create record
    }


    return <ContextStorage.Provider value={{modules, drawings, addDrawing}}>{children}</ContextStorage.Provider>
}

export { useDrawing, ProviderDrawing }