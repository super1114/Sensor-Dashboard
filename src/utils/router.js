import { Switch, Route } from 'react-router-dom'

import { PrivateRoute } from 'components/basic_components/PrivateRoute'
import { HoverProvider } from '../contexts'

import NotFound from 'pages/NotFound'
import PageOne from 'pages/PageOne'
import PageTwo from 'pages/PageTwo'
import PageThree from 'pages/PageThree'
import PageFour from 'pages/PageFour'
import PageFive from 'pages/PageFive'
import PageSix from 'pages/PageSix'
import PageSeven from 'pages/PageSeven'
import PageEight from 'pages/PageEight'
import PageNine from 'pages/PageNine'
import PageTen from 'pages/PageTen'
import PageEleven from 'pages/PageEleven'
import PageElevenB from 'pages/PageElevenB'
import PageTwelve from 'pages/PageTwelve'
import PageThirteen from 'pages/PageThirteen'
import PageFourteen from 'pages/PageFourteen'
import PageFifteen from 'pages/PageFifteen'
import PageSixteen from 'pages/PageSixteen'
import PageSeventeen from 'pages/PageSeventeen'
import PageEighteen from 'pages/PageEighteen'

import Welcome from 'pages/Welcome'

const Router = ({ pages, user }) => {
  return (
    <Switch>
      <PrivateRoute pages={pages} exact path="/" component={Welcome} />
      <PrivateRoute pages={pages} path="/page-one" component={PageOne} />
      <PrivateRoute pages={pages} path="/page-two" component={PageTwo} />
      <PrivateRoute pages={pages} path="/page-three" component={PageThree} />
      <PrivateRoute pages={pages} path="/page-four" component={PageFour} />
      <PrivateRoute pages={pages} path="/page-five" component={PageFive} />
      <PrivateRoute pages={pages} path="/page-six" component={PageSix} />

      <PrivateRoute pages={pages} path="/page-eight" user={user} component={PageEight} />
      <PrivateRoute pages={pages} path="/page-nine" component={PageNine} />
      <PrivateRoute pages={pages} path="/page-ten" component={PageTen} />
      <PrivateRoute pages={pages} path="/page-eleven" component={PageEleven} />
      <PrivateRoute pages={pages} path="/page-eleven-b" component={PageElevenB} />
      <PrivateRoute pages={pages} path="/page-twelve" component={PageTwelve} />
      <PrivateRoute pages={pages} path="/page-thirteen" component={PageThirteen} />
      <PrivateRoute pages={pages} path="/page-fourteen" component={PageFourteen} />
      <PrivateRoute pages={pages} path="/page-sixteen" component={PageSixteen} />
      <PrivateRoute pages={pages} path="/page-seventeen" component={PageSeventeen} />
      <PrivateRoute pages={pages} path="/page-eighteen" component={PageEighteen} />

      <HoverProvider>
        <PrivateRoute pages={pages} path="/page-seven" component={PageSeven} />
        <PrivateRoute pages={pages} path="/page-fifteen" component={PageFifteen} />
      </HoverProvider>

      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Router
