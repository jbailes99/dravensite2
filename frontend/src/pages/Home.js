import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MatchDataContext } from '../components/MatchDataContext'
import { Bars } from 'react-loader-spinner'
import opgg from '../assets/opgg.jpeg'

const Home = () => {
  const { account, lastDravenWin, loading, error, averageKDA, totalSkillshotsDodged } = useContext(MatchDataContext)

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
    <div className='m-8 rounded-xl  container mx-auto p-4 bg-gray-900 text-white'>
      <header className='text-center py-8'>
        <h1 className='text-5xl font-bold mb-4 text-red-600'>Welcome</h1>
        <p className='text-2xl mb-2'>u are visiting the best draven player in the world</p>
        <p className='text-xl mb-2'>and if ur looking at this u prob just got fkd</p>
        <p className='text-lg mb-2'>and i fkd ur sister</p>
        <p className='text-5xl mb-2 font-bold text-red-500'>razr708x54e3328</p>
      </header>
      <img
        className='mx-auto rounded-lg shadow-lg'
        src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Draven_2.jpg'
        alt='Draven Gladiator'
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      <div className='flex flex-col items-center p-6 rounded-lg'>
        <div className='max-w-2xl w-full'>
          {lastDravenWin ? (
            <>
              <div className='bg-white p-4 rounded-lg shadow-md w-full'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>
                  Last Draven Win {getTimeAgo(lastDravenWin.info.gameStartTimestamp)}
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
                    <p className='text-sm font-semibold text-right text-gray-800 mb-2'>
                      {new Date(lastDravenWin.info.gameStartTimestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-cols space-x-6 '>
                <div className='bg-white max-w-xl w:80 p-4 mt-4 rounded-lg shadow-md w-1/2'>
                  {' '}
                  <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>Recent Average KDA</h2>
                  <p className='text-3xl text-gray-800 text-center'>{averageKDA}</p>
                </div>
                <div className='bg-white max-w-xl w:80 p-4 mt-4 rounded-lg shadow-md w-1/2'>
                  {' '}
                  <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>skillshots dodged counter:</h2>
                  <p className='text-3xl text-gray-800 text-center'>{totalSkillshotsDodged}</p>
                </div>
              </div>
            </>
          ) : (
            <div className='flex text-center mt-2 justify-center'>
              <Bars color='yellow' height={18} width={18} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
