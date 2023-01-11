import { NextPage } from 'next'
import Head from 'next/head'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface champselect{
	championid: string
	championname: string
}

const Insert:NextPage = () => {
	const tableHeaders:string[] = ["Champion","Position", "Result", "Kills", "Deaths", "Assists", "Submit"]
	const positions:string[] = ["Top", "Jungle", "Middle", "Bot", "Support"]
	const results:string[] = ["Win", "Loss"]

	const [currentPatch, setCurrentPatch] = useState<string>("12.23.1")

	const [champions, setChampions] = useState<champselect[]>([])
	const [champion, setChampion] = useState<string>("")
	const [position, setPosition] = useState<string>(positions[0])
	const [result, setResult] = useState<string>(results[0])
	const [kills, setKills] = useState<string>("0")
	const [deaths, setDeaths] = useState<string>("0")
	const [assists, setAssists] = useState<string>("0")

	useEffect( () => {
		getCurrentPatch()
		getChampions()
	}, [currentPatch])

	const submitForm = ():void => {
		
	}

	const getCurrentPatch = ():void => {
		axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
			.then(res => {
				let versionArray:string[] = res.data
				setCurrentPatch(versionArray[0])
			})
	}

	const getChampions = ():void => {
		axios.get(`https://ddragon.leagueoflegends.com/cdn/${currentPatch}/data/en_US/champion.json`)
			.then(res => {
				let champs:Object = res.data.data
				let keys:string[] = Object.keys(champs)
				let champsList:champselect[] = keys.map( key => {
					return {
						championid: key,
						championname: champs[key as keyof typeof champs].name  
					}
				})
				setChampions(champsList)
				setChampion(champsList[0].championid)
			})
	}

	return(
		<>
			<Head>
				<title>DB insert</title>

			</Head>
			<main className='bg-gray-900 w-screen min-h-screen'>
				<NavBar/>
				<div className='w-3/5 bg-green-200 m-auto'>
					<table className='table-auto w-full'>
						<thead className='text-xs  uppercase  bg-gray-700 text-gray-400'>
							<tr>
								{
									tableHeaders.map( (header, index) => (
											<th scope='col' className='py-3 px-6' key={index}>{header}</th>
									))
								}
							</tr>
						</thead>
						<tbody className='text-center'>
							<tr className='border-b dark:bg-gray-800 dark:border-gray-700'>
								<td className='pt-5 pb-5'>
									<select value={champion} onChange={ (e) => setChampion(e.target.value)}>
										{
											champions.map( (champ, index) => (
												<option key={index} value={champ.championid}>{champ.championname}</option>
											))
										}
									</select>
								</td>
								<td className='pt-5 pb-5'>
									<select value={position} onChange={ (e)=> setPosition(e.target.value)}>
										{
											positions.map( (position, index) => (
												<option key={index} value={position}>{position}</option>
											))
										}
									</select>
								</td>
								<td className='pt-5 pb-5'>
									<select value={result} onChange={ (e) => setResult(e.target.value)}>
										{
											results.map( (result, index) => (
												<option key={index} value={result}>{result}</option>
											))
										}
									</select>
								</td>
								<td className='pt-5 pb-5'>
									<input onChange={(e) => setKills(e.target.value)} />
								</td>
								<td className='pt-5 pb-5'>
									<input onChange={(e) => setDeaths(e.target.value)}/>
								</td>
								<td className='pt-5 pb-5'>
									<input onChange={(e) => setAssists(e.target.value)}/>
								</td>
								<td>
									<button>Submit</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</main>
		</>
	)
}

export default Insert