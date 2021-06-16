import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import awsconfig from 'aws-exports'
import Amplify, { Auth } from 'aws-amplify'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import { PageProvider } from 'contexts/PageContext'
import { ToolTipProvider } from 'contexts'
import AppBar from 'layout/AppBar'
import Drawer from 'layout/Drawer'
import Routes from 'utils/router'

import styles from './PrimaryLayout.module.scss'
import Tooltip from '../components/basic_components/ToolTip'

Amplify.configure(awsconfig)
Auth.configure(awsconfig)

const useStyles = makeStyles(theme => ({
  root: {
    WebkitTextSizeAdjust: 'none',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    position: 'relative',
    padding: theme.spacing(3),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}))

const PrimaryLayout = () => {
  const [pages, setPages] = useState([])
  const [open, setOpen] = useState(false)
  const [authState, setAuthState] = useState()
  const [user, setUser] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      if (nextAuthState === AuthState.ConfirmSignUp && authData && authData.username) {
        fetch(`${process.env.REACT_APP_API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: authData.username,
            email: authData.signUpAttrs.attributes.email,
            phoneNumber: authData.signUpAttrs.attributes.phone_number,
          }),
        })
          .then(data => data.json())
          .then(user => {
            console.log(user)
          })
          .catch(err => {
            console.log(err)
          })
      }
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (authState === AuthState.SignedIn && user) {
      fetch(`${process.env.REACT_APP_API_URL}/users/${user.username}/layout`)
        .then(data => data.json())
        .then(({ layout }) => {
          // console.log(layout)
          setPages(JSON.parse(layout.pages))
        })
    }
  }, [user, authState])

  return authState === AuthState.SignedIn && user ? (
    <PageProvider>
      <BrowserRouter>
        <ToolTipProvider>
          <div className={classes.root}>
            <AppBar open={open} onDrawerOpen={handleDrawerOpen} user={user} />
            <main className={clsx(classes.content, styles.mainContainer)}>
              <div className={classes.toolbar} />
              <Routes pages={pages} user={user} />
            </main>
            <Drawer open={open} onDrawerClose={handleDrawerClose} pages={pages} />
            <Tooltip bgColor={'default'} position={'top'} />
          </div>
        </ToolTipProvider>
      </BrowserRouter>
    </PageProvider>
  ) : (
    <AmplifyAuthenticator />
  )
}

export default PrimaryLayout
