import React, { createContext, useState, useEffect } from 'react'

export const MatchDataContext = createContext()

export const MatchDataProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [matches, setMatches] = useState([])
  const [averageKDA, setAverageKDA] = useState(0)
  const [lastDravenWin, setLastDravenWin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const GAME_NAME = 'razr708x54e3328'
  const TAG_LINE = '5451'
  const TARGET_CHAMPION_NAME = 'Draven'

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/account/${GAME_NAME}/${TAG_LINE}`)
        const data = await response.json()
        setAccount(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchAccountDetails()
  }, [])
  useEffect(() => {
    const fetchMatchHistory = async () => {
      if (account?.puuid) {
        try {
          console.log('Fetching match history...')

          const matchResponse = await fetch(`http://localhost:5000/api/matches/${account.puuid}`)
          const matchData = await matchResponse.json()

          console.log('Fetched match list:', matchData)

          const matchDetailsPromises = matchData.map(async matchId => {
            console.log(`Fetching details for match ID: ${matchId}`)
            const detailResponse = await fetch(`http://localhost:5000/api/match/${matchId}`)
            return await detailResponse.json()
          })

          const matchesDetails = await Promise.all(matchDetailsPromises)

          console.log('Fetched match details:', matchesDetails)

          const filteredMatches = matchesDetails.filter(match =>
            match.info.participants.some(
              participant => participant.puuid === account.puuid && participant.championName === TARGET_CHAMPION_NAME
            )
          )

          const sortedMatches = filteredMatches.sort((a, b) => b.info.gameStartTimestamp - a.info.gameStartTimestamp)
          const lastWin = sortedMatches.find(match => {
            const participant = match.info.participants.find(p => p.puuid === account.puuid)
            const team = match.info.teams.find(team => team.teamId === participant.teamId)
            return team?.win // Find the first match that was a win
          })

          // Calculate average K/D/A
          const totalStats = filteredMatches.reduce(
            (acc, match) => {
              const participant = match.info.participants.find(p => p.puuid === account.puuid)
              if (participant) {
                acc.totalKills += participant.kills
                acc.totalDeaths += participant.deaths
                acc.totalAssists += participant.assists
                acc.matchCount += 1
              }
              return acc
            },
            { totalKills: 0, totalDeaths: 0, totalAssists: 0, matchCount: 0 }
          )

          const avgKDA =
            totalStats.matchCount > 0 ? (totalStats.totalKills + totalStats.totalAssists) / totalStats.totalDeaths : 0

          setMatches(filteredMatches)
          setAverageKDA(avgKDA.toFixed(2)) // Set average K/D/A ratio
          setLastDravenWin(lastWin || null)
        } catch (error) {
          console.error('Error fetching match history:', error)
          setError('Failed to fetch match history')
        }
      }
    }

    fetchMatchHistory()
  }, [account])

  return (
    <MatchDataContext.Provider value={{ account, matches, lastDravenWin, averageKDA, loading, error }}>
      {children}
    </MatchDataContext.Provider>
  )
}
