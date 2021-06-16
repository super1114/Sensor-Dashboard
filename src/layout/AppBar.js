import React, { useState, useContext, useEffect } from 'react'
import clsx from 'clsx'
import { Auth } from 'aws-amplify'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Switch from 'react-switch'
import DatePicker from 'react-datepicker'
import mqttService from 'service/mqtt'

import apartmentIcon from '../assets/icons/apartment.svg'
import barIcon from '../assets/icons/bar.svg'
import calendarIcon from '../assets/icons/calendar.svg'
import calendarCircleIcon from '../assets/icons/calendarCircle.svg'
import triangleDropDown from '../assets/icons/Triangle.svg'
const client = mqttService.getClient(() => {})

const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.common.baseBackground,
    height: 80,
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  hide: {
    display: 'none',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontFamily: theme.typography.ultralightFontFamily,
  },

  tools: {
    display: 'none',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },

  switchWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontFamily: theme.typography.lightFontFamily,
    width: 200,
    justifyContent: 'space-around',
  },

  dropDownMenu: {
    background: 'transparent',
    backgroundImage: `url('${triangleDropDown}')`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 140,
    color: theme.palette.common.primaryText,
    border: `1px solid ${theme.palette.common.primaryText}`,
    borderRadius: 20,
    height: 27,
    WebkitAppearance: 'none',
    minWidth: 160,
    textAlignLast: 'right',
    textAlign: '-webkit-center',
    paddingRight: 25,
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: '1px',
    fontSize: 12,
  },

  datePicker: {
    background: 'transparent',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 140,
    color: theme.palette.common.primaryText,
    border: `1px solid ${theme.palette.common.primaryText}`,
    borderRadius: 20,
    WebkitAppearance: 'none',
    minWidth: 125,
    textAlignLast: 'right',
    textAlign: '-webkit-center',
    paddingRight: 30,
    width: 90,
    height: 23,
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: '1px',
    fontSize: 12,
  },

  selectGroup: {
    position: 'relative',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: theme.typography.lightFontFamily,
  },
  selectIconApartment: {
    position: 'absolute',
    left: 10,
    width: 13,
    height: 13,
    background: `url('${apartmentIcon}')`,
  },
  selectIconBar: {
    position: 'absolute',
    left: 10,
    width: 13,
    height: 13,
    background: `url('${barIcon}')`,
  },
  selectIconCalendar: {
    position: 'absolute',
    left: 10,
    width: 13,
    height: 13,
    background: `url('${calendarIcon}')`,
  },

  dropDownMenuItem: {
    background: theme.palette.common.baseBackground,
    minHeight: 22,
  },
  calendarWrapper: {
    position: 'absolute',
    top: 30,
    left: 0,
  },
  CalendarCircleIcon: {
    background: `url(${calendarCircleIcon})`,
    position: 'absolute',
    width: 13,
    height: 13,
    right: 10,
  },
  selectDropDownIcon: {
    width: 13,
    height: 13,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginLeft: -20,
  },
}))

const PageWidth = 2230
const PageHeight = 1461

const DashboardAppBar = ({ open, onDrawerOpen, user }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const { pageTitle } = useContext(PageContext)
  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  // Top Menu bar items status
  const [switchState, setSwitchState] = useState(true)
  const [moneySelectState, setMoneySelectState] = useState(1)
  const [relevanceState, setRelevanceState] = useState(1)
  const [date, setSeletedDate] = useState(new Date())

  useEffect(() => {
    const zoomWidthLevel = (windowSize.width - 48) / PageWidth
    const zoomHeightLevel = (windowSize.height - 48 - (matches ? 60 : 48)) / PageHeight

    setZoom(Math.min(zoomWidthLevel, zoomHeightLevel))
  }, [])

  useEffect(() => {
    const zoomWidthLevel = (windowSize.width - 48) / PageWidth
    const zoomHeightLevel = (windowSize.height - 48 - (matches ? 60 : 48)) / PageHeight
    setZoom(Math.min(zoomWidthLevel, zoomHeightLevel))
  }, [windowSize, matches])

  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const signOut = () => {
    Auth.signOut()
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={signOut}>Sign Out</MenuItem>
    </Menu>
  )

  // handlers for top menu toobars
  const handleSwitchChange = checked => {
    mqttService.publish(
      client,
      'toolbar-company',
      JSON.stringify({
        data: checked ? 'company' : 'market',
        user: user.username,
      })
    )
    setSwitchState(!checked)
  }

  const handleRelevanceSelectorChange = e => {
    switch (e.target.value) {
      case '1':
        mqttService.publish(
          client,
          'toolbar-relevance',
          JSON.stringify({
            data: 'relevance',
            user: user.username,
          })
        )
        setRelevanceState(1)
        break
      case '2':
        mqttService.publish(
          client,
          'toolbar-relevance',
          JSON.stringify({
            data: 'reliance',
            user: user.username,
          })
        )
        setRelevanceState(2)
        break
      case '3':
        mqttService.publish(
          client,
          'toolbar-relevance',
          JSON.stringify({
            data: 'dependency',
            user: user.username,
          })
        )
        setRelevanceState(3)
        break
      default:
        break
    }
  }

  const handleMoneySelectorChange = e => {
    switch (e.target.value) {
      case '1':
        mqttService.publish(
          client,
          'toolbar-money',
          JSON.stringify({
            data: 'virgin',
            user: user.username,
          })
        )
        setMoneySelectState(1)
        break
      case '2':
        mqttService.publish(
          client,
          'toolbar-money',
          JSON.stringify({
            data: 'non-virgin',
            user: user.username,
          })
        )
        setMoneySelectState(2)
        break
      case '3':
        mqttService.publish(
          client,
          'toolbar-money',
          JSON.stringify({
            data: 'all',
            user: user.username,
          })
        )
        setMoneySelectState(3)
        break
      default:
        break
    }
  }

  const handleDateChange = date => {
    mqttService.publish(
      client,
      'toolbar-date',
      JSON.stringify({
        data: date,
        user: user.username,
      })
    )
    setSeletedDate(date)
  }

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        {renderMenu}
        <Typography
          className={clsx(classes.title, classes.grow)}
          style={{ fontSize: isNaN(zoom) ? 60 : 60 * zoom }}
          variant="h6"
          noWrap
        >
          {pageTitle || 'OIV Platform'}
        </Typography>

        {pageTitle === 'News at your fingertips' && (
          <div className={clsx(classes.tools)}>
            <div className={classes.selectGroup}>
              <div className={classes.selectIconCalendar}></div>
              <DatePicker
                className={clsx(classes.datePicker)}
                dateFormat="do MMM yyyy"
                selected={date}
                onChange={handleDateChange}
              />
              <div className={classes.CalendarCircleIcon}></div>
            </div>
            <div style={{ width: 10 }}></div>

            <div className={classes.selectGroup}>
              <div className={classes.selectIconBar}></div>
              <select
                className={classes.dropDownMenu}
                style={{
                  textIndent: 50,
                }}
                onChange={handleRelevanceSelectorChange}
                value={relevanceState}
              >
                <option className={classes.dropDownMenuItem} value={1}>
                  Relevance
                </option>
                <option className={classes.dropDownMenuItem} value={2}>
                  Reliance
                </option>
                <option className={classes.dropDownMenuItem} value={3}>
                  Dependency
                </option>
              </select>
            </div>

            <div style={{ width: 150 * zoom }}></div>

            <div className={classes.selectGroup}>
              <div className={classes.selectIconApartment}></div>
              <select
                className={classes.dropDownMenu}
                style={{
                  textIndent: 50,
                }}
                onChange={handleMoneySelectorChange}
                value={moneySelectState}
              >
                <option className={classes.dropDownMenuItem} value={1}>
                  Virgin Money
                </option>
                <option className={classes.dropDownMenuItem} value={2}>
                  Non Money
                </option>
                <option className={classes.dropDownMenuItem} value={3}>
                  All Money
                </option>
              </select>
            </div>

            <div style={{ width: 20 }}></div>

            <div className={classes.switchWrapper}>
              <span>Company</span>
              <Switch
                onChange={() => {
                  handleSwitchChange(switchState)
                }}
                checked={switchState}
                uncheckedIcon={false}
                checkedIcon={false}
                offColor={'#8BB7F0'}
                onColor={'#8BB7F0'}
                handleDiameter={20}
                height={26}
                width={50}
              />
              <span>Market</span>
            </div>
          </div>
        )}

        {pageTitle === 'News at your fingertips - expanded analysis' && (
          <div className={clsx(classes.tools)}>
            <div className={classes.selectGroup}>
              <div className={classes.selectIconCalendar}></div>
              <DatePicker
                className={clsx(classes.datePicker)}
                dateFormat="do MMM yyyy"
                selected={date}
                onChange={handleDateChange}
              />
              <div className={classes.CalendarCircleIcon}></div>
            </div>
          </div>
        )}
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
          className={classes.menuButton}
        >
          <AccountCircle />
        </IconButton>
        <IconButton
          edge="start"
          onClick={onDrawerOpen}
          color="inherit"
          aria-label="open drawer"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default DashboardAppBar
