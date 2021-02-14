import React, {useState, useEffect} from "react";
// import { Switch } from "react-router-dom";
// import { getRoutes } from "./routes.js";
import Toolbar from "./Toolbar";
import Account from "./Account";
import Game from "./Game";
import { useRecoilState } from "recoil";
import { API_BASE_URL } from '../recoil/config'
import { contentState } from "../recoil/atoms"
import { Switch, Route } from "react-router-dom";
import axios from 'axios'

axios.defaults.baseURL = API_BASE_URL

export default function Container({history}) {
	const menuClick = e => setContent(e.target.dataset.tolink)
	
	const [dataContent, setContent] = useRecoilState(contentState)
	const [game, setGame] = useState(null)
	const attachGame = game => setGame(game);

	useEffect(() => {
		if (dataContent != "game" && game != null) {
			game.destroy(true)
			setGame(null)
		}

	}, [game,dataContent])


	return (
		<div className="border">
			<div className="container" data-content={dataContent}>
				<Toolbar menuClick={menuClick} history={history}/>
				<div>
					<Switch>
						<Route path='/login' component={() => <Account view="login" history={history}/>}/>
						<Route path='/register' component={() => <Account view="register" history={history}/>}/>
						<Route path='/reset' component={() => <Account view="reset" history={history}/>}/>
						<Route path='/game' component={() => (dataContent == "game" && game == null) ? <Game setGame={attachGame} game={game}/> : null} />
					</Switch>
				</div>
			</div>
		</div>
	);
}
