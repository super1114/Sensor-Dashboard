import useNodeRed from 'hooks/useNodeRed'

import DashboardCard from 'components/basic_components/DashboardCard'
import ComposeBar from 'components/basic_components/ComposeBar'
import YearColumn from 'components/extra_widgets/YearColumn'
import Column from 'components/basic_components/Column'

const Widget6 = () => {
  const { rows, data } = useNodeRed('widget-6')
  const rowHeight = 33

  return (
    <DashboardCard>
      <YearColumn years={rows} height={rowHeight} />
      <Column>
        <ComposeBar data={data} rowHeight={rowHeight} />
      </Column>
    </DashboardCard>
  )
}

export default Widget6
