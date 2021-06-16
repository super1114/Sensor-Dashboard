import React, { useState } from 'react'

const pageContext = React.createContext({
  pageTitle: '',
  setPageTitle: () => {},
})

export const PageProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('')

  return <pageContext.Provider value={{ pageTitle, setPageTitle }}>{children}</pageContext.Provider>
}

export default pageContext
