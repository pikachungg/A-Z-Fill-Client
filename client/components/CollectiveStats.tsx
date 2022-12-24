
import { FC, useState, useEffect } from 'react'

const CollectiveStats:FC = () => {

	const trackingStats:string[] = ['Total Games', 'Win / Lost', 'Win Rate', 'Most Played Role']

	const [wonGames, setWonGames] = useState<number>(0)
	const [lostGames, setLostGames] = useState<number>(0)
	const [mostPlayedRole, setMostPlayedRole] = useState<string>("temp")

	useEffect( () => {
		//Here goes data fetching
	}, [])


	const getStat = (index:number):JSX.Element => {
		let stat = ""
		switch(index){
			case 0:
				stat = (wonGames + lostGames).toString()
				break
			case 1:
				stat = `${wonGames.toString()} / ${lostGames.toString()}`
				break
			case 2:
				let winrate = (wonGames * 100) / (wonGames + lostGames) 
				stat = `${Math.ceil(winrate).toString()}`
				break
			case 3: 
				stat = mostPlayedRole
				break
		}
		return <p className='text-slate-200 font-semibold text-center'>{stat}</p>
	}

	return(
		<div className='grid grid-cols-4 w-2/5 pb-5'>
			{
				trackingStats.map( (statName, index) => (
					<div key={index}>
						<h1 className='text-green-300 font-semibold text-lg text-center'>{statName}</h1>
						{getStat(index)}
					</div>
				))
			}
		</div>
	)
}

export default CollectiveStats