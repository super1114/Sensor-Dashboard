import { makeStyles } from '@material-ui/core/styles'

import InfoIcon from 'components/Icons/InfoIcon'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 12,
    borderWidth: 5,
    borderColor: theme.palette.common.primaryBlue,
    borderStyle: 'solid',
    padding: 12,
    fontSize: 27,
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.secondaryText,
    backgroundColor: '#3DB6FC12',
    position: 'relative',
    margin: 20,
    marginLeft: 10,
    width: 497,
    letterSpacing: 1.1,
    lineHeight: '30px',
  },
  link: {
    borderRadius: 20,
    width: 40,
    height: 40,
    background: theme.palette.common.primaryBlue,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    transform: 'translate(50%, 50%)',
    cursor: 'pointer',
  },
}))

const Widget11 = () => {
  const { text, link } = useNodeRed('widget-11')
  const classes = useStyles()

  const onClick = () => {
    window.open(link, '_blank')
  }

  return (
    <div className={classes.root}>
      {text}
      <span className={classes.link} onClick={onClick}>
        <InfoIcon />
      </span>
    </div>
  )
}

export default Widget11
