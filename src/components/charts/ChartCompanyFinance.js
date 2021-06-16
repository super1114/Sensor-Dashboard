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

	company: {
		fill: theme.palette.common.primaryBlue,
	},
	finance: {
		fill: theme.palette.common.primaryCyan
	},
	tech: {
		fill: theme.palette.common.secondaryBlue,
	},
	ftse: {
		fill: theme.palette.common.primaryGreen,
	},


	companyConnection: {
		fill: 'transparent',
		stroke: `${theme.palette.common.primaryBlue}`,
	},
	financeConnection: {
		fill: 'transparent',
		stroke: `${theme.palette.common.primaryGreen}`,
	},
	techConnection: {
		fill: 'transparent',
		stroke: `${theme.palette.common.secondaryBlue}`,
	},
	ftseConnection: {
		fill: 'transparent',
		stroke: `${theme.palette.common.primaryGreen}`,
	},

	bottomTechshare: {
		fill: theme.palette.common.secondaryBlue,
		fontSize: 12,
		letterSpacing : 2,
	},
	financeLabel: {
		fill: theme.palette.common.primaryCyan,
		fontSize: 12,
		letterSpacing : 2,
	},
	ftseLabel: {
		fill: theme.palette.common.primaryGreen,
		fontSize: 12,
		letterSpacing : 2,
	},
	companyMarketLabel: {
		fill: theme.palette.common.primaryBlue,
		fontSize: 12,
		letterSpacing : 2,
	},
}))

const ChartCompanyFinance = ({
	financeData,
	yearShow = false,
	circleRadius = 8,
	width = 250,
	heightOfEachRaw = 50,
}) => {

	const classes = useStyles()

	// Get min and max mark of whold data
	let marks = [
		...financeData.map((each) => each.company),
		...financeData.map((each) => each.finance),
		...financeData.map((each) => each.ftse),
		...financeData.map((each) => each.tech)
	]
	let min_mark = Math.min(...marks)
	let max_mark = Math.max(...marks)

	min_mark = min_mark - min_mark % 50
	max_mark = parseInt(max_mark / 50 + 1) * 50

	// Calculate the height and each edgeWidth
	const height = heightOfEachRaw * financeData.length + 120
	const widthOfEachMark = (width - 20) / ((max_mark - min_mark) / 50)

	// Get offset function with particular data
	const getWidthFunc = (point) => 10 + widthOfEachMark * (point - min_mark) / 50


	// Rule marks
	var chartMarks = []
	for (let point = min_mark; point <= max_mark; point += 50) {
		chartMarks.push(
			<g key={point}>
				{/* parseFloat(value).toFixed(1) */}
				<text x={getWidthFunc(point) - 15} y={45 - 20}
					fill="white" style={{ fontSize: 15 }}>
					{point}
				</text>
				<path className={classes.path} d={`M ${getWidthFunc(point)} 50, L ${getWidthFunc(point)} 30`} strokeWidth={1} />
			</g>
		)
	}

	return (
		<div className={classes.root}>
			{
				yearShow ?
					<>
						{
							financeData.map((each, idx) => {
								return (
									<span
										className={classes.yearMark}
										Key={idx}
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
					financeData.map((each, idx) => {
						let currentHeight = 50 + heightOfEachRaw * idx
						return (
							<g key={idx}>
								<path className={classes.path}
									d={`M  0 ${currentHeight}, L ${width} ${currentHeight}`}
									strokeWidth={1}
								/>
								{
									idx === financeData.length - 1
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
												className={classes.companyConnection}
												d={`M ${getWidthFunc(each.company)} ${currentHeight + heightOfEachRaw / 2}, 
													L ${getWidthFunc(financeData[idx + 1].company)} ${currentHeight + heightOfEachRaw * 1.5}`}
												strokeWidth={1}
											/>
											<path
												className={classes.financeConnection}
												d={`M ${getWidthFunc(each.finance)} ${currentHeight + heightOfEachRaw / 2}, 
													L ${getWidthFunc(financeData[idx + 1].finance)} ${currentHeight + heightOfEachRaw * 1.5}`}
												strokeWidth={1}
											/>
											<path
												className={classes.techConnection}
												d={`M ${getWidthFunc(each.tech)} ${currentHeight + heightOfEachRaw / 2}, 
													L ${getWidthFunc(financeData[idx + 1].tech)} ${currentHeight + heightOfEachRaw * 1.5}`}
												strokeWidth={1}
											/>
											<path
												className={classes.ftseConnection}
												d={`M ${getWidthFunc(each.ftse)} ${currentHeight + heightOfEachRaw / 2}, 
													L ${getWidthFunc(financeData[idx + 1].ftse)} ${currentHeight + heightOfEachRaw * 1.5}`}
												strokeWidth={1}
											/>
										</>
								}
								{/* finance circle */}
								<circle cx={getWidthFunc(each.finance)} cy={currentHeight + heightOfEachRaw / 2} r={circleRadius}
									className={classes.finance} />
								{/* tech share circle */}
								<circle cx={getWidthFunc(each.tech)} cy={currentHeight + heightOfEachRaw / 2} r={circleRadius}
									className={classes.tech} />
								{/* FTSE circle */}
								<circle cx={getWidthFunc(each.ftse)} cy={currentHeight + heightOfEachRaw / 2} r={circleRadius}
									className={classes.ftse} />
								{/* company finance circle */}
								<circle cx={getWidthFunc(each.company)} cy={currentHeight + heightOfEachRaw / 2} r={circleRadius}
									className={classes.company} />
							</g>
						)
					})
				}
				<path className={classes.path}
					d={`M  0 ${50 + heightOfEachRaw * financeData.length}, L ${width} ${50 + heightOfEachRaw * financeData.length}`}
					strokeWidth={1}
				/>

				<text className={classes.companyMarketLabel}>
					<tspan x={-10} y={height - 5}>Company</tspan>
				</text>

				<text className={classes.financeLabel}>
					<tspan x={61} y={height - 35}>Finance & </tspan>
					<tspan x={63} y={height - 20}>Business</tspan>
					<tspan x={65} y={height - 5}>Services</tspan>
				</text>

				<text className={classes.bottomTechshare}>
					<tspan x={150} y={height - 20}>Tech</tspan>
					<tspan x={145} y={height - 5}>Shares</tspan>
				</text>

				<text className={classes.ftseLabel}>
					<tspan x={205} y={height - 20}>FTSE</tspan>
					<tspan x={207} y={height - 5}>350</tspan>
				</text>
			</svg>
		</div >
	)
}

export default ChartCompanyFinance
