import useNodeRed from 'hooks/useNodeRed'

import ProgressBar from 'components/processes/ProgressBar'
import ProgressCircle from 'components/processes/ProgressCircle'
import DashboardCard from 'components/basic_components/DashboardCard'
import YearColumn from 'components/extra_widgets/YearColumn'

import { ColorMode } from 'constants/common'

import Column from 'components/basic_components/Column'
import { convertByPercentage } from 'utils/common'

const VisType = {
  bar: 'bar',
  circle: 'circle',
}

const specs = [
  {
    type: VisType.bar,
    bordered: true,
    color: ColorMode.primary,
  },
  {
    type: VisType.bar,
    bordered: false,
    color: ColorMode.primary,
  },
  {
    type: VisType.bar,
    bordered: true,
    color: ColorMode.primary,
  },
  {
    type: VisType.circle,
    bordered: false,
    color: ColorMode.primary,
  },
  {
    type: VisType.circle,
    bordered: false,
    color: ColorMode.primary,
  },
  {
    type: VisType.circle,
    bordered: false,
    color: ColorMode.primary,
  },
  {
    type: VisType.circle,
    bordered: false,
    color: ColorMode.primary,
  },
]

const Widget2 = ({ scale = 1 }) => {
  const { columns, rows, data } = useNodeRed('widget-2')

  return (
    <DashboardCard>
      <YearColumn years={rows} />
      {columns &&
        columns.map((column, index) => {
          const tbd = convertByPercentage(data[index])
          const spec = specs[index]

          return (
            <Column key={`column-${index}`} header={column} bordered={spec.bordered}>
              {tbd.map((x, idx) =>
                spec.type === VisType.bar ? (
                  <ProgressBar
                    color={spec.color}
                    width={100 * scale}
                    progress={x.percentage}
                    value={x.value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    key={`progress-${index}-${idx}`}
                  />
                ) : (
                  <ProgressCircle
                    scale={scale}
                    color={spec.color}
                    progress={x.percentage}
                    value={x.value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    key={`progress-${index}-${idx}`}
                  />
                )
              )}
            </Column>
          )
        })}
    </DashboardCard>
  )
}

export default Widget2
