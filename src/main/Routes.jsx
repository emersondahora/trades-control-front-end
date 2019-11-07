import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import Oportunidade from '../components/oportunidade/Oportunidade'
import Mercado from '../components/mercado/Mercado'
        
export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/oportunidade' component={Oportunidade} />
        <Route path='/mercado' component={Mercado} />
        <Redirect from='*' to='/' />
    </Switch>