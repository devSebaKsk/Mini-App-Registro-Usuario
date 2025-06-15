import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Registro} from './pages/registro/Registro';
import {Listado} from './pages/listado/Listado';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Registro />} />
                <Route path="/listado" element={<Listado />} />
</Routes>
        </Router>
    );
};

export default AppRouter;