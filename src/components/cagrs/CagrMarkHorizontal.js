import React from 'react'

import { ColorMode } from 'constants/common'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		width: '100%',
		position: 'relative',
		fontFamily: theme.typography.ultralightFontFamily,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		backgroundColor: theme.palette.common.secondaryBlack,
		marginBottom: 20,
	},
	lbText: {
		position: 'absolute',
		top: 10,
		fontFamily: theme.typography.ultralightFontFamily,
		fontSize: 8,
	},
	ubText: {
		position: 'absolute',
		fontFamily: theme.typography.ultralightFontFamily,
		fontSize: 8,
		top: 10,
		right: 0,
	},
	progressBar: {
		backgroundColor: theme.palette.common.primaryBlue,
		height: '100%'
	},
	markCircle: {
		backgroundColor: theme.palette.common.primaryText,
		fontFamily: theme.typography.mediumFontFamily,
		color: theme.palette.common.primaryBlue,
		fontSize: 7,
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

const CagrMarkHorizontal = ({
	color = ColorMode.primary,
	ubText,
	lbText,
	ub = 2,
	lb = 10,
	value = 9,
	fontSize = 7,
	height = 20,
	width,
}) => {
	const classes = useStyles()


	return (
		<div
			className={classes.root}
			style={{ height: height }}
		>
			<div className={classes.lbText}>{lbText}</div>
			<div className={classes.ubText}>{ubText}</div>
			<div
				className={classes.progressBar}
				style={{
					width: (value - lb) / (ub - lb) * width,
					height: height,
				}}
			>
			</div>
			<div className={classes.markCircle}
				style={{
					marginLeft: -height / 2,
					width: height,
					height: height,
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

export default CagrMarkHorizontal
