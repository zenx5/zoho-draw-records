import { useState, useEffect, createContext, useContext } from "react";
import SearchService from "../../services/SearchService";
import SettingsService from "../../services/SettingsService";

const ContextStorage = createContext();

function useDrawing() {
    return useContext(ContextStorage)
}

function ProviderDrawing({ children }) {
    const [drawings, setDrawing] = useState([])
    const [modules, setModules] = useState([])
    const [fields, setFields] = useState([])

    useEffect(()=>{
        (async ()=>{
            const modulesResponse = await SettingsService.getModules()
            setModules( prev => modulesResponse.map( module => ({ ...module, fields: [] }) ) )
        })()
    },[])

    const addDrawing = (item) => {
        setDrawing( prev => ([...prev, item]) )
        // create record
    }

    const loadFields = async (entityId) => {
        const newModules = modules;
        for( const module of newModules ) {
            if( module.id===entityId ) {
                if( module.fields.length===0 ) module.fields = await SettingsService.getFields( module.module_name )
                setFields( prev => module.fields )
            }
        }
        setModules( prev => newModules )
    }

    const getDataByRecord = async ( entityName, vsField, nameIndicator, range ) => {
        return await SearchService.getTotal(entityName, nameIndicator, vsField)
    }

    const range = [
        {
            name:'January',
            type:'month',
            from:'01-01-2023',
            to:'30-01-2023'
        },
        {
            name:'February',
            type:'month',
            from:'01-02-2023',
            to:'28-02-2023'
        },
        {
            name:'March',
            type:'month',
            from:'01-03-2023',
            to:'30-03-2023'
        }
    ]


    return <ContextStorage.Provider value={{
        fields,
        modules,
        loadFields,
        drawings,
        addDrawing,
        range,
        getDataByRecord
    }}>{children}</ContextStorage.Provider>
}

export { useDrawing, ProviderDrawing }