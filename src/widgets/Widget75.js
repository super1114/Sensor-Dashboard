import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import HorizontalProgressBar from 'components/processes/HorizontalProgressBar'
import Committe from 'components/extra_widgets/Committe'

import bank from 'assets/icons/bank.svg'
import finance from 'assets/icons/finance.svg'
import investment from 'assets/icons/investment.svg'
import technology from 'assets/icons/technology.svg'
import digital from 'assets/icons/digital.svg'
import marketing from 'assets/icons/marketing.svg'
import legal from 'assets/icons/legal.svg'
import operation from 'assets/icons/operation.svg'
import international from 'assets/icons/international.svg'
import other from 'assets/icons/other.svg'

import clsx from 'clsx'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
    WebkitTextSizeAdjust: 'none',
    position: 'relative',
    width: '100%',
  },
  svgLine: {
    stroke: theme.palette.common.primaryText,
    strokeWidth: 0.3,
  },
  rulerWrapper: {
    position: 'absolute',
    top: 10,
  },
  table: {
    marginLeft: 7,
  },
  titleWrapper: {
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    height: 26,
  },

  topTitle: {
    textAlign: 'left',
    paddingLeft: 2,
    display: 'flex',
    height: 24,
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  eachCell: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    height: 61,
    top: 0,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    fontFamily: theme.typography.lightFontFamily,
  },
  chairAvatar: {
    height: 35,
    width: 42,
    marginLeft: 3,
  },
  avatar: {
    height: 35,
    width: 30,
    marginLeft: 8,
  },
  name: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    textAlign: 'center',
    width: 77,
    marginLeft: -15,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
  },
  progressBarLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 37,
    fontSize: 6,
    letterSpacing: 0.5,
  },
  status: {
    width: 120,
    marginLeft: 2,
  },
  appointmentBg: {
    width: '98%',
    marginLeft: 2,
  },
  appointmentMd: {
    width: '96%',
    marginLeft: 2,
    fontSize: 8,
    lineHeight: '9.38px',
    letterSpacing: 0.67,
  },
  appointmentSm: {
    width: '98%',
    marginLeft: 2,
    fontSize: 7,
    lineHeight: '8.2px',
    letterSpacing: 0.58,
  },
  expImg: {
    width: 17,
    height: 17,
  },
}))

const Widget75 = ({ style = {}, width = 500, height = 300, topic = 'topic-75' }) => {
  const { infoData, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!infoData) {
    return ''
  }

  const eachHeight = 63
  const endYOffset = 50
  const svgRuler = []

  for (let i = 0; i <= 11; i++) {
    svgRuler.push(
      <line
        key={`horizontal-line-${i}`}
        className={classes.svgLine}
        x1={0}
        y1={eachHeight * i + 30}
        x2={width}
        y2={eachHeight * i + 30}
      ></line>
    )
  }

  {
    svgRuler.push(
      <line
        key={`verticl-line-${0}`}
        className={classes.svgLine}
        x1={75}
        y1={0}
        x2={75}
        y2={height - endYOffset}
      ></line>
    )
    svgRuler.push(
      <line
        key={`verticl-line-${1}`}
        className={classes.svgLine}
        x1={121}
        y1={0}
        x2={121}
        y2={height - endYOffset}
      ></line>
    )
    svgRuler.push(
      <line
        key={`verticl-line-${2}`}
        className={classes.svgLine}
        x1={170}
        y1={0}
        x2={170}
        y2={height - endYOffset}
      ></line>
    )
    svgRuler.push(
      <line
        key={`verticl-line-${3}`}
        className={classes.svgLine}
        x1={300}
        y1={0}
        x2={300}
        y2={height - endYOffset}
      ></line>
    )
    svgRuler.push(
      <line
        key={`verticl-line-${4}`}
        className={classes.svgLine}
        x1={480}
        y1={0}
        x2={480}
        y2={height - endYOffset}
      ></line>
    )
    svgRuler.push(
      <line
        key={`verticl-line-${5}`}
        className={classes.svgLine}
        x1={671}
        y1={0}
        x2={671}
        y2={height - endYOffset}
      ></line>
    )
    svgRuler.push(
      <line
        key={`verticl-line-${6}`}
        className={classes.svgLine}
        x1={740}
        y1={0}
        x2={740}
        y2={height - endYOffset}
      ></line>
    )
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        borderRadius: 8,
        margin: 0,
        padding: 10,
        paddingTop: 8,
        paddingBottom: 0,
        width: width,
        height: height,
      }}
    >
      <div className={classes.root}>
        <svg
          className={classes.rulerWrapper}
          height={height - endYOffset}
          viewBox={`0 0 ${width - 30} ${height - endYOffset}`}
          width={width - 30}
          xmlns="http://www.w3.org/2000/svg"
        >
          {svgRuler}
        </svg>
        <table className={classes.table}>
          <thead>
            <tr className={classes.titleWrapper}>
              <th style={{ width: 63 }}>
                <div className={classes.topTitle}>Member</div>
              </th>
              <th style={{ width: 40 }}>
                <div className={classes.topTitle}>Gender</div>
              </th>
              <th style={{ width: 44 }}>
                <div className={classes.topTitle}>Tenure</div>
              </th>
              <th style={{ width: 132 }}>
                <div className={classes.topTitle}>Status</div>
              </th>
              <th style={{ width: 178 }}>
                <div className={classes.topTitle}>Extenral Appointment</div>
              </th>
              <th style={{ width: 190 }}>
                <div className={classes.topTitle}>Experience</div>
              </th>
              <th style={{ width: 65 }}>
                <div className={classes.topTitle}>Board Attendance</div>
              </th>
              <th style={{ width: 105 }}>
                <div className={classes.topTitle}>Committee Attedance</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((each, idx) => {
              return (
                <tr key={idx} style={{ height: eachHeight - 2 }}>
                  <td style={{ position: 'relative', width: '63px !important' }}>
                    <div
                      className={classes.eachCell}
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-around',
                        maxWidth: 63,
                      }}
                    >
                      <img
                        className={clsx({
                          [classes.chairAvatar]: idx === 0,
                          [classes.avatar]: idx !== 0,
                        })}
                        alt="avatar"
                        src={each.avatar}
                      />
                      <div className={classes.name}>{each.firstName}</div>
                      <div className={classes.name}>{each.lastName}</div>
                    </div>
                  </td>
                  <td style={{ position: 'relative' }}>
                    <div className={clsx(classes.eachCell, classes.center)}>{each.gender}</div>
                  </td>
                  <td style={{ position: 'relative' }}>
                    <div className={clsx(classes.eachCell, classes.center)} style={{ flexDirection: 'column' }}>
                      <div style={{ width: 37 }}>
                        <HorizontalProgressBar
                          ub={infoData.tenure.max}
                          lb={infoData.tenure.min}
                          value={each.tenure}
                          progressHeight={8}
                        ></HorizontalProgressBar>
                      </div>
                      <div className={classes.progressBarLabel}>
                        <span>{infoData.tenure.min}</span>
                        <span>{infoData.tenure.max}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ position: 'relative' }}>
                    <div className={clsx(classes.eachCell, classes.status)}>{each.status}</div>
                  </td>
                  <td style={{ position: 'relative' }}>
                    <div
                      className={clsx(classes.eachCell, {
                        [classes.appointmentSm]: each.external.length > 200,
                        [classes.appointmentMd]: each.external.length > 160,
                        [classes.appointmentBg]: each.external.length <= 200,
                      })}
                    >
                      {each.external}
                    </div>
                  </td>
                  <td style={{ position: 'relative' }}>
                    <div className={clsx(classes.eachCell)} style={{ justifyContent: 'space-between', width: '99%' }}>
                      <img
                        className={classes.expImg}
                        src={bank}
                        alt="bank"
                        style={{ visibility: each.experience.includes('bank') ? 'block' : 'hidden' }}
                      ></img>
                      <img
                        className={classes.expImg}
                        src={finance}
                        alt="finance"
                        style={{ visibility: each.experience.includes('finance') ? 'block' : 'hidden' }}
                      ></img>
                      <img
                        className={classes.expImg}
                        src={investment}
                        alt="investment"
                        style={{ visibility: each.experience.includes('investment') ? 'block' : 'hidden' }}
                      ></img>
                      <img
                        className={classes.expImg}
                        src={technology}
                        alt="technology"
                        style={{ visibility: each.experience.includes('technology') ? 'block' : 'hidden' }}
                      ></img>
                      <img
                        className={classes.expImg}
                        src={digital}
                        alt="digital"
                        style={{ visibility: each.experience.includes('digital') ? 'block' : 'hidden' }}
                      ></img>
                      <img
                        className={classes.expImg}
                        src={marketing}
                        alt="marketing"
                        style={{ visibility: each.experience.includes('marketing') ? 'block' : 'hidden' }}
                      ></img>
                      <img
                        className={classes.expImg}
                        src={legal}
                        alt="legal"
                        style={{ visibility: each.experience.includes('legal') ? 'block' : 'hidden' }}
                      ></img>
                      <img
                        className={classes.expImg}
                        src={operation}
                        alt="operation"
                        style={{ visibility: each.experience.includes('operation') ? 'block' : 'hidden' }}
                      ></img>
                      <img
                        className={classes.expImg}
                        src={international}
                        alt="international"
                        style={{ visibility: each.experience.includes('international') ? 'block' : 'hidden' }}
                      ></img>
                      <img
                        className={classes.expImg}
                        src={other}
                        alt="other"
                        style={{ visibility: each.experience.includes('other') ? 'block' : 'hidden' }}
                      ></img>
                    </div>
                  </td>
                  <td style={{ position: 'relative' }}>
                    <div className={clsx(classes.eachCell, classes.center)} style={{ flexDirection: 'column' }}>
                      <div style={{ width: 58 }}>
                        <HorizontalProgressBar
                          ub={infoData.boardAttendance.max}
                          lb={infoData.boardAttendance.min}
                          value={each.boardAttendance}
                          progressHeight={8}
                        ></HorizontalProgressBar>
                      </div>
                      <div className={classes.progressBarLabel} style={{ width: 55 }}>
                        <span>{infoData.boardAttendance.min}</span>
                        <span>{infoData.boardAttendance.max}</span>
                      </div>
                    </div>
                  </td>

                  <td style={{ position: 'relative' }}>
                    <div
                      className={classes.eachCell}
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        width: 95,
                        paddingTop: 6,
                        height: 55,
                      }}
                    >
                      <Committe info={infoData.commits.r} data={each.commit.r} width={28} height={7} />
                      <Committe info={infoData.commits.n} data={each.commit.n} width={28} height={7} />
                      <Committe info={infoData.commits.ri} data={each.commit.ri} width={28} height={7} />
                      <Committe info={infoData.commits.a} data={each.commit.a} width={28} height={7} />
                      <Committe info={infoData.commits.c} data={each.commit.c} width={28} height={7} />
                      <Committe info={infoData.commits.o} data={each.commit.o} width={28} height={7} />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  )
}

export default Widget75
