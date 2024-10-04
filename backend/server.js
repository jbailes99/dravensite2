const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
require('dotenv').config() // Load environment variables from .env file

const app = express()
const PORT = process.env.PORT || 5000

const cors = require('cors')
app.use(
  cors({
    origin: 'https://bestdraven.world', // or '*', but it's safer to be more specific
  })
)

//europe, americas, asia
const v5region = 'europe'

//na1, euw1, eun1, br1, kr, etc..
const v4region = 'euw1'

const apiKey = process.env.API_KEY // Use environment variable

app.get('/api/account/:gameName/:tagLine', async (req, res) => {
  const { gameName, tagLine } = req.params

  try {
    const response = await fetch(
      `https://${v5region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${apiKey}`
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
      `https://${v5region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${apiKey}`
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
app.get('/api/poop/id/:puuid', async (req, res) => {
  const { puuid } = req.params
  try {
    const response = await fetch(
      `https://${v4region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`
    )
    if (response.ok) {
      const data = await response.json()
      res.json(data)
    } else {
      res.status(response.status).json({ error: 'Failed to fetch accountId' })
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
      `https://${v5region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}
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

app.get('/api/league/:id', async (req, res) => {
  const { id } = req.params
  try {
    const response = await fetch(
      `https://${v4region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${apiKey}

      `
    )
    if (response.ok) {
      const data = await response.json()
      res.json(data)
    } else {
      res.status(response.status).json({ error: 'Failed to fetch league stats' })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
