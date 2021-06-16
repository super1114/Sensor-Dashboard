import useNodeRed from 'hooks/useNodeRed'

import Column from 'components/basic_components/Column'
import ProgressBar from 'components/processes/ProgressBar'
import DashboardCard from 'components/basic_components/DashboardCard'
import YearColumn from 'components/extra_widgets/YearColumn'
import VerticalProgressBar from 'components/processes/VerticalProgressBar'

import { ColorMode, TextMode } from 'constants/common'

import { convertByPercentage } from 'utils/common'

const VisType = {
  horizontal: 'horizontal',
  vertical: 'vertical',
}

const specs = [
  {
    type: VisType.horizontal,
    color: ColorMode.primary,
    mode: TextMode.inner,
    width: 280,
    digits: 0,
  },
  {
    type: VisType.vertical,
    color: ColorMode.primary,
    highlightTop: false,
    width: 80,
    digits: 1,
  },
  {
    type: VisType.horizontal,
    color: ColorMode.primary,
    mode: TextMode.inner,
    width: 180,
    digits: 1,
  },
  {
    type: VisType.vertical,
    color: ColorMode.primary,
    highlightTop: false,
    width: 40,
    digits: 1,
  },
  {
    type: VisType.horizontal,
    color: ColorMode.primary,
    mode: TextMode.inner,
    width: 440,
    digits: 1,
  },
]

const Widget9 = ({ scale = 1 }) => {
  const { columns, rows, data } = useNodeRed('widget-9')

  return (
    <DashboardCard>
      <YearColumn years={rows} />
      {columns &&
        columns.map((column, index) => {
          const tbd = convertByPercentage(data[index])
          const spec = specs[index]

          return (
            <Column key={`column-${index}`} header={column} bordered={spec.bordered}>
              {spec.type === VisType.horizontal ? (
                tbd.map((x, idx) => (
                  <ProgressBar
                    {...spec}
                    width={spec.width * scale}
                    height={25}
                    progress={x.percentage}
                    value={x.value.toLocaleString(undefined, {
                      maximumFractionDigits: spec.digits,
                    })}
                    key={`progress-${index}-${idx}`}
                  />
                ))
              ) : (
                <VerticalProgressBar
                  {...spec}
                  width={spec.width * scale}
                  values={data[index].map(x =>
                    x.toLocaleString(undefined, {
                      maximumFractionDigits: spec.digits,
                    })
                  )}
                />
              )}
            </Column>
          )
        })}
    </DashboardCard>
  )
}

export default Widget9
