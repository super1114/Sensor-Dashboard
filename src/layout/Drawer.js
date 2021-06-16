import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { pageRoutes } from 'constants/common'
import { useRouter } from 'hooks/useRouter'

const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  paper: {
    background: theme.palette.common.baseCardBackground,
    color: theme.palette.common.primaryText,
    fontFamily: theme.typography.semiBoldFontFamily,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
    borderRight: 'unset',
    [theme.breakpoints.up('sm')]: {
      width: 0,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    color: theme.palette.common.primaryText,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  iconButton: {
    color: theme.palette.common.primaryText,
  },
}))

const DashboardDrawer = ({ open, onDrawerClose, pages }) => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.paper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton
          classes={{
            root: classes.iconButton,
          }}
          onClick={onDrawerClose}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {pages.map((page, index) => (
          <ListItem
            button
            onClick={() => {
              router.push(pageRoutes[page])
            }}
            key={`layout-${index}`}
            selected={pageRoutes[page] === router.pathname}
          >
            <ListItemText primary={page} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default DashboardDrawer
