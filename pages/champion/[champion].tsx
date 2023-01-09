import {useState, useEffect} from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import NavBar from '../../components/NavBar'
import ChampionStats from '../../components/ChampionStats'
import ChampionTable from '../../components/ChampionTable'

interface Match{
	matchid: number
	position: number
	result: number
	kills: number
	deaths: number
	assists: number
	screenshot: string
}

interface ChampionInformation{
	wins: number
	loss: number
	winrate: number
	matchhistory: Match[]
}

const Champion:NextPage = () => {
	const router = useRouter()
	const { asPath } = router

	const [currentPatch, setCurrentPatch] = useState<string>("12.23.1")
	const [championid, setChampionid] = useState<string>("")
	const [championName, setChampionName] = useState<string>("")
	const [championImg, setChampionImg] = useState<string>("") 

	const [championInformation, setChampionInformation] = useState<ChampionInformation>({wins: 0, loss: 0, winrate: 0, matchhistory: []})

	useEffect( () => {
		if (router.isReady){
			getCurrentPatch()
			getChampionid()
		}
	}, [router.isReady])

	useEffect( () => {
		getChampionImg()
		getChampionInformation()
	}, [championid])

	useEffect( () => {
		const config = {
			headers:{
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			}
		}
		if (championid !== ""){
			axios.get(`http://azapi-env.eba-p85m38pz.us-east-1.elasticbeanstalk.com/champion/${championid}`, config)
			.then( res => {
				let data = res.data
				if (data.matchhistory.length > 0){
					setChampionInformation(data)
				}
			})
		}
	}, [championid])
	
	const getCurrentPatch = ():void => {
		axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
			.then(res => {
				let versionArray:string[] = res.data
				setCurrentPatch(versionArray[0])
			})
	}

	const getChampionid = ():void => {
		setChampionid(asPath.split("/")[2])
	}

	const getChampionInformation = ():void => {
		if (championid.length > 0){
			axios.get(`http://ddragon.leagueoflegends.com/cdn/${currentPatch}/data/en_US/champion/${championid}.json`)
			.then(res => {
				let data:any = res.data.data
				setChampionName(data[championid].name)	
			})
		}
	}

	const getChampionImg = (): void => {
		if (championid.length > 0){
			setChampionImg(`http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/${championid}.png`)
		}
	}

	return(
		<>
			<Head>
				<title>Shapeless | {championName} Stats</title>
			</Head>
			<main className='min-h-screen bg-gray-900'>
				<NavBar/>
				<div className='md:w-3/5 md:m-auto overflow-auto'>	
					<ChampionStats img={championImg} name={championName} wins={championInformation.wins} loss={championInformation.loss} winrate={championInformation.winrate}/>
					<ChampionTable champinfo={championInformation}/>
				</div>
			</main>
		</>
	)
}

export default Champion