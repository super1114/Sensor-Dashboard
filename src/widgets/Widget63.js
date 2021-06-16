import { makeStyles, ThemeProvider } from '@material-ui/core/styles'

import { useState, useEffect } from 'react'

import DashboardCard from 'components/basic_components/DashboardCard'
import LineGraphWithTitle from 'components/graphs/LineGraphWithTitle'
import TableChart from 'components/tables/TableChart'
import GradientTableChart from 'components/tables/GradientTableChart'
import { CardMode } from 'constants/common'

import OutLineTriangle from 'assets/icons/outlineTriangle.svg'
import useNodeRed from 'hooks/useNodeRed'

import mqttService from 'service/mqtt'
import { SettingsSystemDaydreamSharp } from '@material-ui/icons'
const client = mqttService.getClient(() => {})

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 10,
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 11.02,
    lineHeight: '13px',
    letterSpacing: 0.92,
    marginBottom: -12,
  },

  nearCompetitor: {
    marginTop: -10,
    marginBottom: 3,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  nearTitle: {
    cursor: 'pointer',
    zIndex: 1000,
    backgroundColor: theme.palette.common.secondaryCardBackground,
    width: 113,
    height: 18,
    borderRadius: 4.41,
    paddingLeft: 6,
    paddingRight: 6,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 8.82,
    lineHeight: '10.34px',
    letterSpacing: 0.74,
    marginBottom: -18,
  },

  dropDownPanel: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 13,
    backgroundColor: theme.palette.common.secondaryCardBackground,
    opacity: 1,
    zIndex: 100,
    width: 125,
    paddingTop: 5,
    borderRadius: 6,
  },
  eachItem: {
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 8.82,
    lineHeight: '10.34px',
    letterSpacing: 0.74,
    fontFamily: theme.typography.lightFontFamily,
    width: 125,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.common.secondaryBlue,
    },
  },
}))

const Widget63 = ({ style = {}, width = 500, height = 300, topic = 'topic-63' }) => {
  const nodeData = useNodeRed(topic)
  const classes = useStyles()

  const [title, setTitle] = useState(null)
  const [data, setData] = useState(null)
  const [years, setYears] = useState(null)

  const [change, setChange] = useState(0)
  const [nearItem, setNearItem] = useState(0)
  const [dropShown, setDropShown] = useState(0)

  useEffect(() => {
    if (!title && nodeData) {
      setTitle(nodeData.title)
      setData(nodeData.data)
      setYears(nodeData.years)
    }
  })

  if (!title) {
    return ''
  }

  const changeFirstGraphData = () => {
    // data.company[1].extraData = data.company[1].data.map(each => each + Math.floor(Math.random() * 200 + 300))
    let length = data.company[2].data.length
    for (let idx = 0; idx < length; idx++) {
      let each = data.company[2].data[idx]
      if (each.arrow) {
        each.arrow = false
        data.company[2].data[(idx + 1) % length].arrow = true
        data.company[1].extraData = data.company[2].data[(idx + 1) % length].marks.map(each => each.value)
        setChange(!change)
        break
      }
    }
  }

  const changeLastGraphData = () => {
    // let tmp = data.competitors
    let length = data.competitors[nearItem].data.length

    for (let idx = 0; idx < length; idx++) {
      let each = data.competitors[nearItem].data[idx]
      if (each.arrow) {
        each.arrow = false
        data.competitors[nearItem].data[(idx + 1) % length].arrow = true
        data.company[3].data = data.competitors[nearItem].data[(idx + 1) % length].marks.map(each => each.competitor)
        data.company[3].extraData = data.competitors[nearItem].data[(idx + 1) % length].marks.map(each => each.company)
        break
      }
    }
    setChange(!change)
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        borderRadius: 8,
        margin: 0,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>

        {data.company.map((each, idx) => {
          if (each.type === 'lineGraph')
            return (
              <LineGraphWithTitle
                key={idx}
                width={width - 10}
                values={each.data}
                extraValues={each.extraData}
                extraStrokeColor={each.extraGraphColor}
                strokeType={each.strokeType}
                strokeColor={each.graphColor}
                suffix={each.label}
                title={each.title}
                titleTextAlign={'right'}
                noText={each.noText}
                fontBold={true}
                labelYPosition={'bottom'}
                height={40}
                fontSize={8}
                outerRadius={4.5}
                innerRadius={2.5}
                strokeWidth={0.5}
                titleWidth={0.275}
                titleMargin={6}
                unit={idx === 1 ? 3000 : null}
              />
            )
          return (
            <div key={idx}>
              <TableChart
                data={each.data}
                showYear={idx === 0 ? true : false}
                years={years}
                height={24}
                width={width - 15}
                chartCellType={'oneLine'}
                titleTextAlign={'right'}
                fontSize={8}
                titleWidth={0.2}
                marginTitle={43}
                yearPosition={10}
                parentFunc={changeFirstGraphData}
              />
              <div style={{ height: 5 }}></div>
            </div>
          )
        })}

        {data.competitors.length && (
          <>
            <div className={classes.nearCompetitor}>
              <a
                className={classes.nearTitle}
                onClick={() => {
                  setDropShown(!dropShown)
                }}
                style={{
                  borderBottom: dropShown ? `1px solid white` : 'none',
                  height: dropShown ? 17 : 18,
                }}
              >
                <img src={OutLineTriangle} alt={'triangle'} width={11} height={7}></img>
                <div>{data.competitors[nearItem].title}</div>
              </a>
              <div className={classes.dropDownPanel} style={{ display: dropShown ? 'block' : 'none' }}>
                {data.competitors.map((each, idx) => {
                  return (
                    <a
                      className={classes.eachItem}
                      key={idx}
                      onClick={() => {
                        setNearItem(idx)
                        setDropShown(false)
                      }}
                    >
                      {each.title}
                    </a>
                  )
                })}
              </div>
            </div>
            <GradientTableChart
              data={data.competitors[nearItem].data}
              showYear={false}
              years={years}
              height={26}
              width={width - 15}
              chartCellType={'oneLine'}
              titleTextAlign={'right'}
              fontSize={8}
              titleWidth={0.28}
              marginTitle={40}
              yearPosition={10}
              parentFunc={changeLastGraphData}
            />
            <div style={{ height: 5 }}></div>
          </>
        )}
      </div>
    </DashboardCard>
  )
}

export default Widget63
