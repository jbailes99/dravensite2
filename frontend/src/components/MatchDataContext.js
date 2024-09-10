import React, { createContext, useState, useEffect } from 'react'

export const MatchDataContext = createContext()

export const MatchDataProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [matches, setMatches] = useState([])
  const [averageKDA, setAverageKDA] = useState(0)
  const [totalAssistPings, setTotalAssistPings] = useState(0)
  const [totalAllInPings, setTotalAllInPings] = useState(0)

  const [lastDravenWin, setLastDravenWin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalSkillshotsDodged, setTotalSkillShotsDodged] = useState(0)
  const [averageKillParticipation, setAverageKillParticipation] = useState(0) // New state for average KP

  const summonerId = 'xQdioZU2fHV7Jl9ETOkU4-nYmK2yItcS8o676wOyMHaCl964JLXrPdAc_A'
  const GAME_NAME = 'razr708x54e3328'
  const TAG_LINE = '5451'
  const TARGET_CHAMPION_NAME = 'Draven'
  const backendUrl = process.env.REACT_APP_BACKEND_SERVER_URI

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/account/${GAME_NAME}/${TAG_LINE}`)
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
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/league/${summonerId}`)
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

          const matchResponse = await fetch(`${backendUrl}/api/matches/${account.puuid}`)
          const matchData = await matchResponse.json()

          console.log('Fetched match list:', matchData)

          const matchDetailsPromises = matchData.map(async matchId => {
            console.log(`Fetching details for match ID: ${matchId}`)
            const detailResponse = await fetch(`${backendUrl}/api/match/${matchId}`)
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
              const team = match.info.teams.find(team => team.teamId === participant.teamId)

              if (participant) {
                acc.totalKills += participant.kills
                acc.totalDeaths += participant.deaths
                acc.totalAssists += participant.assists
                acc.totalKP += participant.challenges?.killParticipation || 0
                acc.totalAssistPings += participant.assistMePings
                acc.totalAllIn += participant.onMyWayPings

                // skillshot counter
                const skillShotsDodged = participant.challenges?.skillshotsDodged || 0
                acc.totalSkillShotsDodged += skillShotsDodged // Sum skillshotsDodged

                acc.matchCount += 1
              }
              return acc
            },
            {
              totalKills: 0,
              totalDeaths: 0,
              totalAssists: 0,
              totalSkillShotsDodged: 0, // Initialize this to 0
              totalKP: 0,
              totalAllIn: 0,
              totalAssistPings: 0,
              matchCount: 0,
            }
          )

          const avgKDA =
            totalStats.matchCount > 0 ? (totalStats.totalKills + totalStats.totalAssists) / totalStats.totalDeaths : 0

          const avgKillParticipation =
            totalStats.matchCount > 0
              ? (totalStats.totalKP / totalStats.matchCount) * 100 // Convert to percentage and round to the nearest whole number
              : 0

          setMatches(filteredMatches)
          setAverageKDA(avgKDA.toFixed(2))
          setLastDravenWin(lastWin || null)
          setTotalSkillShotsDodged(totalStats.totalSkillShotsDodged) // Set the total skillshots dodged
          setAverageKillParticipation(avgKillParticipation.toFixed(2)) // Set average KP
          setTotalAssistPings(totalStats.totalAssistPings)
          setTotalAllInPings(totalStats.totalAllIn)
        } catch (error) {
          console.error('Error fetching match history:', error)
          setError('Failed to fetch match history')
        }
      }
    }

    fetchMatchHistory()
  }, [account])

  return (
    <MatchDataContext.Provider
      value={{
        account,
        matches,
        lastDravenWin,
        averageKDA,
        totalSkillshotsDodged,
        loading,
        error,
        averageKillParticipation,
        totalAssistPings,
        totalAllInPings,
      }}
    >
      {children}
    </MatchDataContext.Provider>
  )
}
