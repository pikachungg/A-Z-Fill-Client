
import { FC, useState, useEffect } from 'react'
import axios from 'axios';

interface TotalStats{
	wins: number,
	loss: number,
	totalgames: number,
	winrate: number
}

interface MostPlayed{
	position: string,
	amountplayed: number
}

const CollectiveStats:FC = () => {

	const trackingStats:string[] = ['Total Games', 'Win / Lost', 'Win Rate', 'Most Played Role']

	const [wonGames, setWonGames] = useState<number>(0)
	const [lostGames, setLostGames] = useState<number>(0)
	const [winrate, setWinrate] = useState<number>(0)
	const [mostPlayedRole, setMostPlayedRole] = useState<string>("")

	useEffect( () => {

		axios.get('https://a-z-fill-api-production.up.railway.app/totalstats')
			.then( res => {
				let data: TotalStats = res.data
				setWonGames( Number(data.wins) )
				setLostGames( Number(data.loss) ) 
				setWinrate( Number(data.winrate) )
			})

		axios.get('https://a-z-fill-api-production.up.railway.app/mostplayedposition')
			.then( res => {
				let data: MostPlayed = res.data
				setMostPlayedRole( data.position )
			})
		
	}, [])


	const getStat = (index:number):JSX.Element => {
		let stat = ""
		switch(index){
			case 0:
				stat = `${wonGames + lostGames}`
				break
			case 1:
				stat = `${wonGames.toString()} / ${lostGames.toString()}`
				break
			case 2:
				stat = `${winrate}`
				break
			case 3: 
				stat = mostPlayedRole
				break
		}
		return <p className='text-slate-200 font-semibold text-center'>{stat}</p>
	}

	return(
		<div className='grid grid-cols-4 md:w-4/5 lg:w-3/5 pb-5'>
			{
				trackingStats.map( (statName, index) => (
					<div key={index}>
						<h1 className='text-green-300 md:font-semibold md:text-lg text-center'>{statName}</h1>
						{getStat(index)}
					</div>
				))
			}
		</div>
	)
}

export default CollectiveStats