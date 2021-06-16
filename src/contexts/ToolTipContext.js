import React from 'react'
import { useState } from 'react'
const ToolTipContext = React.createContext({
    content : '',
    xPos : 0,
    yPos : 0,
    shown : false,
    zoom : 1,
    setToolTipData: () => { }
})

export const ToolTipProvider = ({ children }) => {
    const [content, setContent] = useState(null)
    const [xPos, setXPos] = useState(0)
    const [yPos, setYPos] = useState(0)
    const [shown, setShown] = useState(false)
    const [zoom, setZoom] = useState(1)
    
    const setToolTipData = (content = null, xPos = 0,  yPos = 0, shown=false, zoom = 1,) => {
        setContent (content)
        setXPos (xPos)
        setYPos (yPos)
        setShown (shown)
        setZoom (zoom)
    }

    return <ToolTipContext.Provider value={{ content, xPos, yPos, shown, zoom, setToolTipData }}>
        {children}
    </ToolTipContext.Provider>
}

export default ToolTipContext