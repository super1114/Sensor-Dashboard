import useNodeRed from 'hooks/useNodeRed'

import DashboardCard from 'components/basic_components/DashboardCard'
import ComposeBarWithGrid from 'components/basic_components/ComposeBarWithGrid'
import YearColumn from 'components/extra_widgets/YearColumn'
import Column from 'components/basic_components/Column'

const Widget5 = () => {
  const { rows, data } = useNodeRed('widget-5')
  const rowHeight = 40

  return (
    <DashboardCard>
      <YearColumn years={rows} height={rowHeight} />
      <Column>
        <ComposeBarWithGrid data={data} rowHeight={rowHeight} height={25} />
      </Column>
    </DashboardCard>
  )
}

export default Widget5
