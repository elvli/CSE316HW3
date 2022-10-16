import './App.css';
import { React } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar, DeleteListModal, DeleteSongModal, EditSongModal } from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            <Route exact component={DeleteListModal} />
            <Route exact component={DeleteSongModal} />
            <Route exact component={EditSongModal} />
            <Statusbar />
        </Router>
    )
}

export default App