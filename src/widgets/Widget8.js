import useNodeRed from 'hooks/useNodeRed'

import DashboardCard from 'components/basic_components/DashboardCard'
import ComposeBar, { BarMode } from 'components/basic_components/ComposeBar'
import YearColumn from 'components/extra_widgets/YearColumn'
import Column from 'components/basic_components/Column'

const Widget8 = () => {
  const { rows, data } = useNodeRed('widget-6')
  const rowHeight = 33

  return (
    <DashboardCard>
      <YearColumn years={rows} height={rowHeight} />
      <Column>
        <ComposeBar data={data} rowHeight={rowHeight} mode={BarMode.outer} />
      </Column>
    </DashboardCard>
  )
}

export default Widget8
