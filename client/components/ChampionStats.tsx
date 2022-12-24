import Image from 'next/image'
import { FC } from 'react'
import Link from 'next/link'

interface CompProps {
	img:string
	name:string
	champinfo: ChampionInformation
}

interface ChampionInformation{
	championid: string
	wins: number
	loss: number
	matchhistory: Match[]
}

interface Match{
	date: string
	position: string
	result: string
	kills: string
	deaths: string
	assists: string
	screenshot: string
	vod: string
}

const ChampionStats:FC<CompProps> = (props:CompProps) => {
	const stats = ["Wins", "Loss", "Win Rate"]

	const getStat = (index:number): JSX.Element => {
		let val:string = ''
		let styles:string = ``
		switch(index){
			case 0:
				val = props.champinfo.wins.toString()
				styles = 'text-center text-green-300 text-lg'
				break
			case 1:
				val = props.champinfo.loss.toString()
				styles = 'text-center text-red-300 text-lg'
				break
			case 2: 
				let total:number = props.champinfo.wins + props.champinfo.loss
				let winrate:number = Math.floor((props.champinfo.wins * 100) / total)
				val = winrate.toString() + "%"
				styles = `text-center text-lg ${winrate > 50 ? 'text-green-300': 'text-red-500'}`
				break
		}
		return(<p className={styles}>{val}</p>)
	}
	
	return (
		<div className='flex mt-10 m-auto bg-slate-700'>
			<Image src={props.img} alt={`Image for champion ${props.name}`} width={100} height={100}/>
			<div className='block ml-5'>
				<Link className='text-2xl text-green-300 font-semibold ease-in-out transition-all duration-500 hover:text-green-400' href={`https://leagueoflegends.fandom.com/wiki/${props.name.replace(" ", "_")}/LoL`} target="_blank">
					<h1>{props.name}</h1>
				</Link>
				<div className='flex mt-3'>
					{
						stats.map( (stat, index) => (
							<div className={`${index > 0 ? 'ml-10' : ''}`} key={index}>
								<h1 className={`text-lg text-slate-300 font-semibold`}>{stat}</h1>
								{getStat(index)}
							</div>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default ChampionStats