import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from './pages/Landing'
import TeacherForm from './pages/TeacherForm'
import TeacherList from './pages/TeacherList'


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = '/'  component = {Landing}/>
            <Route path = '/give-classes' component = {TeacherForm} />
            <Route path = '/study' component = {TeacherList}/>
        </Switch> 
    </BrowserRouter>
)

export default Routes;
