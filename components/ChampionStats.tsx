import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import Link from 'next/link'

interface CompProps {
	wins: number
	loss: number
	winrate: number
	img: string
	name: string
}

const ChampionStats:FC<CompProps> = (props:CompProps) => {
	const stats = ["Wins", "Loss", "Win Rate"]


	const getStat = (index:number): JSX.Element => {
		let val:string = ''
		let styles:string = ``
		switch(index){
			case 0:
				val = props.wins.toString()
				styles = 'text-center text-green-300 text-lg'
				break
			case 1:
				val = props.loss.toString()
				styles = 'text-center text-red-300 text-lg'
				break
			case 2: 
				val = props.winrate.toString() + "%"
				styles = `text-center text-lg ${props.winrate > 50 ? 'text-green-300': 'text-red-500'}`
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