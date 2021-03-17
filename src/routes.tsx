 import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Continentes from './pages/Continentes'
import PaisesPop from './pages/PaisesPop'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Continentes}/>
                <Route path="/paisesPop" component={PaisesPop}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes