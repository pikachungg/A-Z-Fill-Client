import { FC, useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'

interface ChampionObject {
	championid: string,
	img: string
}

const ChampionPool:FC = () => {

	const [currentPatch, setCurrentPatch] = useState<string>("12.23.1")
	const [splashes, setSplashes] = useState<ChampionObject[]>([])
	
	useEffect( () => {
		getCurrentPatch()
		getChampions()
	},[currentPatch])

	const getCurrentPatch = ():void => {
		axios.get('http://ddragon.leagueoflegends.com/api/versions.json')
			.then(res => {
				let versionArray:string[] = res.data
				setCurrentPatch(versionArray[0])
			})
	}

	const getChampions = ():void => {
		axios.get(`http://ddragon.leagueoflegends.com/cdn/${currentPatch}/data/en_US/champion.json`)
			.then(res => {
				let champs:Object = res.data.data
				let keys:string[] = Object.keys(champs)
				let squareImg:ChampionObject[] = keys.map( x => {
					return {
						championid: x,
						img: `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/${x}.png`
					}
				})
				setSplashes(squareImg)
			})
	}

	return(
		<div className='flex flex-wrap justify-center'>
			{
				splashes.map( (champion, index) => (
					<Link className='relative' href={`/champion/${champion.championid}`} key={index}>
						<Image src={champion.img} alt={champion.championid} width={70} height={70} className="m-1"/>
					</Link>
				))
			}
		</div>
	)
}

export default ChampionPool