import { ButtonBase } from "@mui/material";
import { useRef, useState } from "react";

export default function Color({ 
    value,
    onChange,
    size='auto',
    sx={}
}) {
    const [color, setColor] = useState(value)
    const [isClick, setIsClick] = useState(false)
    const pickerRef = useRef()

    const handlerClick = () => {
        setIsClick(true)
        pickerRef.current.showPicker()
        setIsClick(false)
    }

    const handlerChangeColor = (event) => {
        const newColor = event.target.value 
        if ( onChange ) {
            onChange(newColor, event)
        } 
        setColor( prev => newColor )
    }

    return <ButtonBase 
        sx={{
            padding:2,
            width: {
                auto:'auto',
                small:'50px',
                medium:'100px',
                large:'150px'
            }[size],
            borderRadius:2,
            ...sx,
            backgroundColor:color,
            borderLeft: '5px solid rgba(255,255,255,0.5)',
            borderRight: '5px solid rgba(255,255,255,0.5)',
            boxShadow: isClick ? '0px 0px 2px' : '1px 1px 4px',
        }}
        onClick={handlerClick}
    >
        <input 
            type='color' 
            ref={pickerRef} 
            onChange={handlerChangeColor}
            style={{ 
                opacity:0,
                width:0,
                height:0
            }}/>
    </ButtonBase>
}