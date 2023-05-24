import { IconButton } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import useVisibility from "../hooks/useVisibility"

export default function ToggleVisibility({ onToggle }) {
    const [visible, toggle] = useVisibility()

    return <IconButton onClick={async ()=>{
        toggle();
        if( onToggle!==undefined ) onToggle( !visible )
    }}>{visible?<Visibility />: <VisibilityOff/>}</IconButton>
}