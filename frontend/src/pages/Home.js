import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MatchDataContext } from '../components/MatchDataContext'
import { Bars } from 'react-loader-spinner'
import { FaCheck } from 'react-icons/fa'

const Home = () => {
  const {
    account,
    lastDravenWin,
    loading,
    error,
    averageKDA,
    totalSkillshotsDodged,
    averageKillParticipation,
    totalAssistPings,
    totalAllInPings,
  } = useContext(MatchDataContext)

  function getTimeAgo(gameStartTimestamp) {
    const currentTime = Date.now()
    const timeDifference = currentTime - gameStartTimestamp

    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60))
    const daysAgo = Math.floor(hoursAgo / 24)
    const remainingHours = hoursAgo % 24

    if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`
    } else {
      return `${daysAgo} days and ${remainingHours} hours ago`
    }
  }

  return (
    <div className='m-8 sm:rounded-xl rounded-sm justify-center text-center  bg-gray-900 text-white'>
      <header className='text-center sm:py-8 '>
        <h1 className=' text-4xl sm:hidden block font-bold mb-8 text-yellow-600'>bestdraven.world</h1>

        <h1 className='sm:text-5xl text-3xl  font-bold mb-4 text-red-500'>razr708x54e3328</h1>
        <p className='sm:text-2xl text-2xl mb-2'>u are visiting the best draven player in the world</p>
        <p className='sm:text-md text-sm mb-2'>and if ur looking at this u prob just got fkd</p>
        <p className='sm:text-xs text-xxs mb-2'>and i fkd ur sister</p>
        {/* <p className='sm:text-5xl text-4xl mb-2 font-bold text-red-500'>razr708x54e3328</p> */}
      </header>
      <div className='flex flex-row justify-center space-x-2 sm:space-x-3 md:space-x-6 lg:space-x-12  xl:space-x-24'>
        <img
          className='w-[40%] mr-4 rounded-2xl'
          src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Draven_2.jpg'
          alt='Draven Gladiator'
        />
        <img
          className='w-[40%] rounded-2xl'
          src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Draven_1.jpg'
          alt='Draven Gladiator'
        />
      </div>

      <div className='flex flex-col items-center p-6 rounded-lg'>
        {lastDravenWin ? (
          <>
            <div className='max-w-2xl w-full'>
              <h2 className='text-2xl font-semibold text-white mb-2 text-center'>Last Draven win:</h2>
              <div className='bg-white p-4 rounded-lg shadow-md w-full'>
                <h2 className='sm:text-2xl text-xl font-semibold text-green-500 mb-2 text-center flex items-center justify-center'>
                  <FaCheck className='text-green-500 mr-4' />

                  {getTimeAgo(lastDravenWin.info.gameStartTimestamp)}
                </h2>
                <div className='flex items-center space-x-4'>
                  <img
                    className='h-24 w-24 rounded-full border-4 border-yellow-400'
                    src='https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Draven.png'
                    alt='Draven'
                  />
                  <div className='flex-1'>
                    {lastDravenWin.info.participants && (
                      <div className='mt-4'>
                        {lastDravenWin.info.participants.map(participant => {
                          if (participant.puuid === account.puuid && participant.championName === 'Draven') {
                            return (
                              <p key={participant.puuid} className='text-2xl mb-2  font-medium text-gray-800'>
                                {participant.kills}/{participant.deaths}/{participant.assists}
                              </p>
                            )
                          }
                          return null
                        })}
                      </div>
                    )}
                    <p className='text-lg font-medium text-gray-600'>
                      Duration: {Math.floor(lastDravenWin.info.gameDuration / 60)} minutes
                    </p>
                    <p
                      className={`text-2xl font-medium ${
                        lastDravenWin.info.teams.some(team => team.win) ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {lastDravenWin.info.teams.some(team => team.win) ? 'Victory' : 'Defeat'}
                    </p>
                    <p className='text-sm font-semibold sm:text-right sm:mt-0 mt-4 text-gray-800 mb-2'>
                      {new Date(lastDravenWin.info.gameStartTimestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center text-center items-center mt-4'>
              <h1 className='text-2xl font-semibold text-white mb-2'>recent stats</h1>
            </div>
            <div className='flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full md:w-3/4'>
              <div className='bg-white max-w-xl w-full md:w-80 p-4 rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>Avg KDA</h2>
                <p className='text-3xl text-gray-800 text-center'>{averageKDA}</p>
              </div>
              <div className='bg-white max-w-xl w-full md:w-80 p-4 rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>Skillshots Dodged Counter:</h2>
                <p className='text-3xl text-gray-800 text-center'>{totalSkillshotsDodged}</p>
              </div>
              <div className='bg-white max-w-xl w-full md:w-80 p-4 rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>Average KP:</h2>
                <p className='text-3xl text-gray-800 text-center'>{Math.round(averageKillParticipation)}%</p>
              </div>
              {/* <div className='bg-white max-w-xl w-full md:w-80 p-4 rounded-lg shadow-md'>
    <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>
      How Many Times I Pinged All In:
    </h2>
    <p className='text-3xl text-gray-800 text-center'>{totalAllInPings}</p>
  </div> */}
              <div className='bg-white max-w-xl w-full md:w-80 p-4 rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>Assistance Ping Counter:</h2>
                <p className='text-3xl text-gray-800 text-center'>{totalAssistPings}</p>
              </div>
            </div>
          </>
        ) : (
          <div className='flex text-center mt-2 justify-center'>
            <Bars color='yellow' height={18} width={18} />
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  )
}

export default Home
