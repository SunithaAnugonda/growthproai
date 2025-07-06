const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const headlines = [
  "Why Cake & Co is Mumbai's Sweetest Spot in 2025",
  "Discover How Cake & Co Becomes Mumbai’s Favorite Bakery",
  "The Secret Behind Cake & Co’s Delicious Success in Mumbai",
  "Cake & Co is Redefining Mumbai's Dessert Scene",
  "How Cake & Co Sets the Standard for Bakeries in Mumbai"
]

app.post('/business-data', (req, res) => {
  const { name, location } = req.body
  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)]
  res.json({
    rating: (Math.random() * 1 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 50,
    headline: randomHeadline
  })
})

app.get('/regenerate-headline', (req, res) => {
  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)]
  res.json({ headline: randomHeadline })
})

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000')
})
