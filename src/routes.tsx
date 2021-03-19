 import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Continentes from './pages/Continentes'
import Idiomas from './pages/Idiomas'
import PaisesPop from './pages/PaisesPop'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Continentes}/>
                <Route path="/paisesPop" component={PaisesPop}/>
                <Route path="/idiomas" component={Idiomas}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes