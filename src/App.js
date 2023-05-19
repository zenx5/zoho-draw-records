import { useEffect} from 'react'
import {  BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import DrawingView from './views/Drawing/Index';

export default function App(){
    const navigate = useNavigate();
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    })
    useEffect(() => {
      console.log(params)
        const path = params.path
        switch (path) {
          case 'drawing':
            navigate('/drawing')
            break
          default:
            navigate('/app')
            break
        }
    }, [])

    return(
        <Routes>
            <Route path='/app' element='creado con React'/>
            <Route path='/drawing' element={<DrawingView />}/>

        </Routes>
    )
}