 import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Continentes from './pages/Continentes'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                
                <Route path="/" exact component={Continentes}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes