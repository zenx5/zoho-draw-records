import { useState } from "react";

function useVisibility( defaultVisibility = true ){
    const [visibility, setVisibility] = useState(defaultVisibility)

    const toggleVisibility = () => {
        setVisibility( prevVisibility => !prevVisibility )
    }

    return [ visibility, toggleVisibility ]
}

export default useVisibility;