import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {Registro} from './pages/registro/Registro';
import {Listado} from './pages/listado/Listado';

const AppRouter = () => {
    return (
        <Router>
                <Route path="/" component={Registro} />
                <Route path="/listado" component={Listado} />
        </Router>
    );
};

export default AppRouter;