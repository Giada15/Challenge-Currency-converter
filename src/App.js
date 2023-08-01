// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState } from "react"

export default function App() {
  const [amount, setAmount] = useState("")

  return (
    <div>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="text"
      />
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
    </div>
  )
}
