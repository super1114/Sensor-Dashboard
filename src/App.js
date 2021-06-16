import PrimaryLayout from 'layout/PrimaryLayout'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'fonts/style.css'

const theme = createMuiTheme({
  typography: {
    blackFontFamily: ['SF UI Display Black'].join(','),
    boldFontFamily: ['SF UI Display Bold'].join(','),
    heavyFontFamily: ['SF UI Display Heavy'].join(','),
    lightFontFamily: ['SF UI Display Light'].join(','),
    mediumFontFamily: ['SF UI Display Medium'].join(','),
    semiBoldFontFamily: ['SF UI Display Semibold'].join(','),
    thinFontFamily: ['SF UI Display Thin'].join(','),
    ultralightFontFamily: ['SF UI Display Ultralight'].join(','),

    fontFamily: ['SF UI Display Light'],
  },
  palette: {
    common: {
      primaryBlack: '#000',
      primaryRed: '#F65C6B',
      primaryBlue: '#30B6FC',
      primaryCyan: '#52FFFF',
      primaryGreen: '#00F6B9',
      primaryBorder: '#9293A8',
      primaryText: '#fff',
      primaryGray: '#d8d8d8',
      secondaryBlack: '#46466D',
      secondaryRed: '#FcaCf5',
      darkRed: '#503257',
      darkGreen: '#3D4A56',
      secondaryBlue: '#4E5BFC',
      thirdBlue: '#3DB6FC',
      secondaryGreen: '#98D265',
      baseBackground: '#16103A',
      baseCardBackground: '#272953',
      secondaryCardBackground: '#46456d',
      secondaryText: '#ddd',
      thirdText: '#aaa',
      fourthText: '#979797',
      secondaryCyan: '#8BB7F0',
    },
  },
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <PrimaryLayout />
    </ThemeProvider>
  )
}

export default App
