import {useState, useEffect} from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import NavBar from '../../components/NavBar'
import ChampionStats from '../../components/ChampionStats'
import ChampionTable from '../../components/ChampionTable'

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

interface ChampionInformation{
	championid: string
	wins: number
	loss: number
	matchhistory: Match[]
}

const Champion:NextPage = () => {
	const router = useRouter()
	const { asPath } = router


	const [currentPatch, setCurrentPatch] = useState<string>("12.23.1")
	const [championid, setChampionid] = useState<string>("")
	const [championName, setChampionName] = useState<string>("")
	const [championImg, setChampionImg] = useState<string>("") 

	const [championInformation, setChampionInformation] = useState<ChampionInformation>({championid: "K'Sante", wins: 10, loss: 20, matchhistory: [{date: '12/23/2022', position: 'Support', result: 'Win', kills: '10', deaths: '5', assists: '20', screenshot: 'https://www.google.com/', vod: 'https://www.google.com/'}]})

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
				<div className='w-3/5 m-auto'>	
					<ChampionStats img={championImg} name={championName} champinfo={championInformation}/>
					<ChampionTable champinfo={championInformation}/>
				</div>
			</main>
		</>
	)
}

export default Champion