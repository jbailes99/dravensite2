const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
const apiKey = 'RGAPI-45b236fd-990f-4424-a07d-74231d22a87d'

app.get('/api/account/:gameName/:tagLine', async (req, res) => {
  const { gameName, tagLine } = req.params

  try {
    const response = await fetch(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${apiKey}`
    )
    if (response.ok) {
      const data = await response.json()
      res.json(data)
    } else {
      res.status(response.status).json({ error: `Failed to fetch account details` })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.get('/api/matches/:puuid', async (req, res) => {
  const { puuid } = req.params
  try {
    const response = await fetch(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${apiKey}`
    )
    if (response.ok) {
      const data = await response.json()
      res.json(data)
    } else {
      res.status(response.status).json({ error: 'Failed to fetch match IDs' })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.get('/api/match/:matchId', async (req, res) => {
  const { matchId } = req.params
  try {
    const response = await fetch(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}
      `
    )
    if (response.ok) {
      const data = await response.json()
      res.json(data)
    } else {
      res.status(response.status).json({ error: 'Failed to fetch match' })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
