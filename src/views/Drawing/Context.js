import { useState, useEffect, createContext, useContext } from "react";
import { ZOHO } from "../../tools/ZohoEmbededAppSDK"

const ContextStorage = createContext();

function useStorage() {
    return useContext(ContextStorage)
}

function ProviderDrawing({ children }) {

    useEffect(()=>{
        console.log('use effect for init SDK')
        ZOHO.embeddedApp.on('PageLoad', async (response) => {
            console.log('PageLoad')
            await getModules()
        })
        console.log( ZOHO )
        console.log( ZOHO.embeddedApp )
        console.log( ZOHO.embeddedApp.init )
        ZOHO.embeddedApp.init()
    },[])

    const getModules = async () => {
        const response = await ZOHO.CRM.META.getModules()
        console.log( 'modules', response )
    }


    return <ContextStorage.Provider value={{}}>{children}</ContextStorage.Provider>
}

export { ProviderDrawing }