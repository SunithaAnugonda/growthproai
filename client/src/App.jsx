// src/App.jsx
const API = "https://growthproai-p29l.onrender.com"

import { useState } from 'react'
import axios from 'axios'
import './style.css'

export default function App() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [data, setData] = useState(null)
  const [errors, setErrors] = useState({ name: '', location: '' })

  const validate = () => {
    const errs = { name: '', location: '' }
    if (name.trim().length < 2) errs.name = 'Name must be at least 2 characters'
    if (location.trim().length < 2) errs.location = 'Location must be at least 2 characters'
    setErrors(errs)
    return !errs.name && !errs.location
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return
    const res = await axios.post(`${API}/business-data`, { name, location })
    setData(res.data)
  }

  const regenerateHeadline = async () => {
    const res = await axios.get(
      `${API}/regenerate-headline?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}`
    )
    setData(prev => ({ ...prev, headline: res.data.headline }))
  }

  return (
    <div className="wrapper">
      <div className="form-container">
        <h2>Local Business Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Business Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input-field"
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="input-field"
          />
          {errors.location && <p className="error">{errors.location}</p>}
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </div>

      {data && (
        <div className="card active">
          <div className="card-body">
            <h3>{name} – {location}</h3>
            <p>Rating: <strong>{data.rating}★</strong></p>
            <p>Reviews: <strong>{data.reviews}</strong></p>
            <p><em>{data.headline}</em></p>
            <button onClick={regenerateHeadline} className="btn-secondary">
              Regenerate SEO Headline
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
