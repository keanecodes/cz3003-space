import React, {useState, useEffect} from "react";
// import { getRoutes } from "./routes.js";
import Toolbar from "./components/Toolbar";
import Account from "./pages/Account";
import Leaderboard from "./pages/Leaderboard";
import Topics from "./pages/Topics";
import GameWrapper from "./pages/GameWrapper";
import { useRecoilValue } from "recoil";
import { API_BASE_URL } from './recoil/config'
import { pageTabState } from "./recoil/atoms"
import { Switch, Route } from "react-router-dom";
import axios from 'axios'

axios.defaults.baseURL = API_BASE_URL

export default function Container({history}) {
	const dataContent = useRecoilValue(pageTabState)

	return (
		<div className="border">
			<div className="container" data-content={dataContent}>
				<Toolbar history={history}/>
				<>
					<Switch>
						<Route path='/login' component={() => <Account view="login" history={history}/>}/>
						<Route path='/register' component={() => <Account view="register" history={history}/>}/>
						<Route path='/reset' component={() => <Account view="reset" history={history}/>}/>
						<Route path='/game' component={() => (dataContent == "game") ? <GameWrapper/> : null} />
						<Route path='/leaderboard' component={Leaderboard} />
						<Route path='/topics' component={Topics} />
					</Switch>
				</>
			</div>
		</div>
	);
}
