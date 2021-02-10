import React, {useState, useEffect} from "react";
// import { Switch } from "react-router-dom";
// import { getRoutes } from "./routes.js";
import Toolbar from "./Toolbar";
import Account from "./Account";
import Game from "./Game";

export default function Container({history}) {
	const menuClick = e => {
		e.preventDefault()
    setContent(e.target.dataset.tolink)
		// history.push("/login")
  }

	const handleMountedGame = state => setGameMount(state);
	const attachGame = game => setGame(game);

	const [dataContent, setContent] = useState("home")
	const [gameMounted, setGameMount] = useState(false)
	const [game, setGame] = useState(null)

	useEffect(() => {
		if (dataContent != "game" && game != null) {
			game.destroy(true)
			setGame(null)
			setGameMount(false)
		}

	}, [game,dataContent])


	return (
		<div className="border">
			<div className="container" data-content={dataContent}>
				<Toolbar menuClick={menuClick}/>
				{dataContent == "login" 
					? <Account/> 
					: dataContent == "game" && gameMounted == false 
						? <Game setGame={attachGame} mounted={gameMounted} handleMounted={handleMountedGame}/> 
						: null}
			</div>
		</div>
	);
}
