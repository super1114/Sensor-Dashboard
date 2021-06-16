import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		width: '100%',
		position: 'relative',
		fontFamily: theme.typography.ultralightFontFamily,
	},
	path: {
		fill: 'transparent',
		stroke: theme.palette.common.primaryText
	},
	text: {
		fill: theme.palette.common.primaryText,
	},
	yearMark: {
		position: 'absolute',
		left: -5,
		top: 0,
		fontSize: 15,
		color: theme.palette.common.primaryText
	},

	minimumBar: {
		fill: 'transparent',
		stroke: `${theme.palette.common.primaryRed}`
	},

	maximumBar: {
		fill: 'transparent',
		stroke: `${theme.palette.common.secondaryGreen}`,
	},

	markConnection: {
		fill: 'transparent',
		stroke: `${theme.palette.common.primaryBlue}`,
	},

	sliderBar: {
		fill: 'transparent',
		stroke: theme.palette.common.primaryText
	},

	company: {
		fill: theme.palette.common.primaryBlue,
	},

	bottomMarketLabel: {
		fill: theme.palette.common.primaryRed,
		fontSize: 12,
		letterSpacing: 2,
	},
	topMarketLabel: {
		fill: theme.palette.common.secondaryGreen,
		fontSize: 12,
		letterSpacing: 2,
	},
	nearCompetitorLabel: {
		// fill: theme.palette.common.light,
		fill: theme.palette.common.primaryText,
		fontSize: 12,
		letterSpacing: 2,
	},
	companyMarketLabel: {
		fill: theme.palette.common.primaryBlue,
		fontSize: 12,
		letterSpacing: 2,
	},

}))

const ChartCompanyMarket = ({
	marketData,
	yearShow = true,
	circleRadius = 8,
	width = 250,
	heightOfEachRaw = 50,
}) => {
	const classes = useStyles()

	// Get min and max mark of whold data
	let bt_marks = marketData.map((each) => each.bt_mark)
	let tp_marks = marketData.map((each) => each.tp_mark)
	let bt_min = Math.min(...bt_marks)
	let tp_max = Math.max(...tp_marks)

	// Round for showing rule
	bt_min = Math.floor(bt_min)
	tp_max = Math.ceil(tp_max)

	// Total height and edgewidth
	const height = heightOfEachRaw * marketData.length + 120


	// Getting size of width for particular point
	const getWidthFunc = (point) => 10 + (width - 20) / (tp_max - bt_min) * (point - bt_min)


	// Ruler's marks
	var chartMarks = []
	var ruleToggle = true
	for (let point = bt_min; point <= tp_max; point += (tp_max - bt_min) / 8) {
		let markLine = ruleToggle ? 20 : 10
		ruleToggle = 1 - ruleToggle

		chartMarks.push(
			<g key={point}>
				<text x={getWidthFunc(point) - 15} y={markLine === 20 ? 25 : 37}
					fill="white" style={{ fontSize: markLine === 20 ? 15 : 10 }}>
					£{parseFloat(point)}
				</text>
				<path className={classes.path}
					d={`M ${getWidthFunc(point)} 50, L ${getWidthFunc(point)} ${50 - markLine}`} strokeWidth={1} />
			</g>
		)
	}

	return (
		<div className={classes.root}>
			{
				yearShow ?
					<>
						{
							marketData.map((each, idx) => {
								return (
									<span
										className={classes.yearMark}
										key={idx}
										style={{
											top: 65 + idx * heightOfEachRaw
										}}
									>
										{each.year}
									</span>
								)
							})
						}
					</>
					:
					<></>
			}
			<svg
				height={height}
				viewBox={`0 0 ${width - 20} ${height}`}
				width="100%"
				xmlns="http://www.w3.org/2000/svg"
			>
				{chartMarks}
				{
					marketData.map((each, idx) => {
						let currentHeight = 50 + heightOfEachRaw * idx
						return (
							<g key={idx}>
								<path className={classes.path}
									d={`M  0 ${currentHeight}, L ${width} ${currentHeight}`}
									strokeWidth={1}
								/>
								{
									idx === marketData.length - 1
										?
										<></>
										:
										<>
											<path className={classes.path}
												d={`M  0 ${currentHeight}, L 0 ${50 + currentHeight + heightOfEachRaw}`}
												strokeWidth={1}
											/>
											<path className={classes.path}
												d={`M  ${width} ${currentHeight}, L ${width} ${50 + currentHeight + heightOfEachRaw}`}
												strokeWidth={1}
											/>

											{/* draw the line connection*/}
											<path
												className={classes.markConnection}
												d={`M  ${getWidthFunc(each.company)} ${currentHeight + heightOfEachRaw / 2}, L ${getWidthFunc(marketData[idx + 1].company)} ${currentHeight + heightOfEachRaw * 1.5}`}
												strokeWidth={1}
											/>
										</>
								}

								{/* Slider for min */}
								<path
									className={classes.minimumBar}
									d={`M  ${getWidthFunc(each.bt_mark)} ${currentHeight + 12}, L ${getWidthFunc(each.bt_mark)} ${currentHeight + heightOfEachRaw - 12}`}
									strokeWidth={2}
								/>
								{/* slider for max pric */}
								<path
									className={classes.maximumBar}
									d={`M  ${getWidthFunc(each.tp_mark)} ${currentHeight + 12}, L ${getWidthFunc(each.tp_mark)} ${currentHeight + heightOfEachRaw - 12}`}
									strokeWidth={2}
								/>
								{/* competitor company price */}
								<path
									className={classes.sliderBar}
									d={`M  ${getWidthFunc(each.nr_comp)} ${currentHeight + 12}, L ${getWidthFunc(each.nr_comp)} ${currentHeight + heightOfEachRaw - 12}`}
									strokeWidth={2}
								/>
								{/* middle bar */}
								<path
									className={classes.sliderBar}
									d={`M  ${getWidthFunc(each.bt_mark)} ${currentHeight + heightOfEachRaw / 2}, L ${getWidthFunc(each.tp_mark)} ${currentHeight + heightOfEachRaw / 2}`}
									strokeWidth={2}
								/>
								{/* company price circle */}
								<circle cx={getWidthFunc(each.company)} cy={currentHeight + heightOfEachRaw / 2} r={circleRadius} className={classes.company} />
							</g>
						)
					})
				}
				<path className={classes.path}
					d={`M  0 ${50 + heightOfEachRaw * marketData.length}, L ${width} ${50 + heightOfEachRaw * marketData.length}`}
					strokeWidth={1}
				/>

				<text x={0} y={height} className={classes.bottomMarketLabel}>
					<tspan x={-30} y={height - 5 - 15}>Bottom of</tspan>
					<tspan x={-20} y={height - 5}>Market</tspan>
				</text>

				<text x={0} y={height - 5} className={classes.topMarketLabel}>
					<tspan x={50} y={height - 5 - 15}>Top of</tspan>
					<tspan x={48} y={height - 5}>Market</tspan>
				</text>

				<text x={0} y={height - 5} className={classes.nearCompetitorLabel}>
					<tspan x={110} y={height - 5 - 15}>Nearest</tspan>
					<tspan x={105} y={height - 5}>Competitor</tspan>
				</text>

				<text x={0} y={height - 5} className={classes.companyMarketLabel}>
					<tspan x={185} y={height - 5}>Company</tspan>
				</text>
			</svg>
		</div >
	)
}

export default ChartCompanyMarket
