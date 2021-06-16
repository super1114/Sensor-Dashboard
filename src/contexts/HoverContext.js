import React from 'react'
import { useState } from 'react'
const HoverContext = React.createContext({
    hoverIndex: 'Not on',
    hoverType: 'Not on',
    hoverInfo: {
        year: null,
        bt_mark: null,
        tp_mark: null,
        near_comp: null,
        marketPrice: null
    },
    setHoverData: () => { }
})

export const HoverProvider = ({ children }) => {
    const [hoverIndex, setHoverIndex] = useState("Not on")
    const [hoverType, setHoverType] = useState("Not on")
    const [hoverInfo, setHoverInfo] = useState({})

    const setHoverData = (newHoverIndex, newHoverType, hoverInfo = {}) => {
        setHoverIndex(newHoverIndex)
        setHoverType(newHoverType)
        setHoverInfo(hoverInfo)
    }

    return <HoverContext.Provider value={{ hoverIndex, hoverType, hoverInfo, setHoverData }}>
        {children}
    </HoverContext.Provider>
}

export default HoverContext