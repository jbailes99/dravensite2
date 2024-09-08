import React, { useState, useEffect, useContext } from 'react'
import MatchCard from '../components/cards'
import { Bars } from 'react-loader-spinner'
import { MatchDataContext } from '../components/MatchDataContext'

const RIOT_API_KEY = 'RGAPI-45b236fd-990f-4424-a07d-74231d22a87d' // Replace with your Riot API key
const GAME_NAME = 'razr708x54e3328' // Replace with the game name you want to query
const TAG_LINE = '5451' // Replace with the tag line you want to query
const TARGET_CHAMPION_NAME = 'Draven' // Champion name to filter by

const Profile = () => {
  const { account, lastDravenWin, loading, error, matches } = useContext(MatchDataContext)

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
      <div className='App'>
        {matches === undefined ? (
          <p>Loading...</p>
        ) : matches.length === 0 ? (
          <div className=''>
            <h2 className='text-4xl mt-4 font-bold text-white'>Draven Match History</h2>
            <div className='flex flex-col items-center justify-center h-screen'>
              <Bars color='#2d3748' height={80} width={80} />
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center p-6 rounded-lg'>
            <h2 className='text-3xl font-semibold text-white mb-4'>Recent Draven Games</h2>
            {matches.map(match => {
              const participant = match.info.participants.find(participant => participant.puuid === account.puuid)
              const team = match.info.teams.find(team => team.teamId === participant?.teamId)

              return (
                <div key={match.metadata.matchId} className='bg-white p-4 rounded-lg shadow-md w-full max-w-3xl mb-4'>
                  <div className='flex items-center space-x-4'>
                    <img
                      className='h-24 w-24 rounded-full border-4 border-yellow-400'
                      src='https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Draven.png'
                      alt='Draven'
                    />
                    <div className='ml-24'>
                      {participant && (
                        <div className='mt-4'>
                          <p className='text-2xl mb-2 font-medium text-gray-800'>
                            {participant.kills}/{participant.deaths}/{participant.assists}
                          </p>
                        </div>
                      )}
                      <p className='text-lg font-medium text-gray-600'>
                        {Math.floor(match.info.gameDuration / 60)} minutes
                      </p>

                      <p className='text-sm font-semibold text-right text-gray-800 mb-2'>
                        {new Date(match.info.gameStartTimestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className='flex-1'>
                      <p className={`text-2xl font-medium ${team?.win ? 'text-green-500' : 'text-red-500'}`}>
                        {team?.win ? 'Victory' : 'Defeat'}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
export default Profile
