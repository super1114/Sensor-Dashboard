import useNodeRed from 'hooks/useNodeRed'

import DashboardCard from 'components/basic_components/DashboardCard'
import ComposeBarWithGridOuter from 'components/basic_components/ComposeBarWithGridOuter'
import YearColumn from 'components/extra_widgets/YearColumn'
import Column from 'components/basic_components/Column'

const Widget7 = () => {
  const { rows, data } = useNodeRed('widget-7')
  const rowHeight = 40

  return (
    <DashboardCard>
      <YearColumn years={rows} height={rowHeight} />
      <Column>
        <ComposeBarWithGridOuter data={data} rowHeight={rowHeight} height={25} />
      </Column>
    </DashboardCard>
  )
}

export default Widget7
