import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    cyanCircle: {
        borderRadius: '100%',
        backgroundColor: theme.palette.common.primaryCyan,
    },
    blueCircle: {
        borderRadius: '100%',
        backgroundColor: theme.palette.common.primaryBlue,
    },
    dangerCircle: {
        borderRadius: '100%',
        backgroundColor: theme.palette.common.primaryRed,
    }
}))

const CircleTypePercentage = ({
    height = 10,
    value = 0,
    maxValue = 100,
    circleColor = 'blue'
}) => {
    const classes = useStyles()

    return (
        <div
            className={value < 0 ? classes.dangerCircle : circleColor === 'blue' ? classes.blueCircle : classes.cyanCircle}
            style={{
                height: height * Math.abs(value) / maxValue,
                width: height * Math.abs(value) / maxValue,
            }}
        >
        </div>
    )
}

export default CircleTypePercentage
