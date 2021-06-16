import React from 'react'

import { ColorMode } from 'constants/common'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		position: 'relative',
		fontFamily: theme.typography.ultralightFontFamily,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		backgroundColor: theme.palette.common.secondaryBlack,
		marginRight: 20,
	},
	lbText: {
		position: 'absolute',
		top: 0,
		right: -10,
		fontFamily: theme.typography.ultralightFontFamily,
		fontSize: 8,
	},
	ubText: {
		position: 'absolute',
		fontFamily: theme.typography.ultralightFontFamily,
		fontSize: 8,
		bottom: 0,
		right: -10,
	},
	progressBar: {
		backgroundColor: theme.palette.common.primaryBlue,
		width: '100%'
	},
	markCircle: {
		backgroundColor: theme.palette.common.primaryText,
		fontFamily: theme.typography.mediumFontFamily,
		color: theme.palette.common.primaryBlue,
		borderRadius: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	beforeTriangle: {
		position: 'absolute',
		width: 0,
		height: 0,
		borderRight: '2px solid white',
		borderTop: '4.5px solid transparent',
		borderBottom: '4.5px solid transparent',
		left: -3,
		top: 0,
	},
	afterTriangle: {
		position: 'absolute',
		width: 0,
		height: 0,
		borderLeft: '2px solid white',
		borderTop: '4.5px solid transparent',
		borderBottom: '4.5px solid transparent',
		right: -3,
		top: 0,
	}
}))

const CagrMarkVertical = ({
	color = ColorMode.primary,
	ubText,
	lbText,
	ub = 2,
	lb = 10,
	value = 9,
	fontSize = 7,
	height,
	width = 20,
}) => {
	const classes = useStyles()

	return (
		<div
			className={classes.root}
			style={{ width: width, height: height }}
		>
			<div className={classes.lbText}>{lbText}</div>
			<div className={classes.ubText}>{ubText}</div>
			<div
				className={classes.progressBar}
				style={{
					height: (value - lb) / (ub - lb) * height,
					width: width,
				}}
			>
			</div>
			<div className={classes.markCircle}
				style={{
					marginTop: -width / 2,
					width: width,
					height: width,
					fontSize: fontSize
				}}
			>
				<div className={classes.beforeTriangle}></div>
				{value}
				<div className={classes.afterTriangle}></div>
			</div>
		</div>
	)
}

export default CagrMarkVertical
