// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react"

export default function App() {
  const [amount, setAmount] = useState(0)
  const [currency1, setCurrency1] = useState("USD")
  const [currency2, setCurrency2] = useState("EUR")
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(
    function () {
      const controller = new AbortController()

      async function fetchData() {
        setIsLoading(true)
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currency1}&to=${currency2}`,
            { signal: controller.signal }
          )

          if (!res.ok) throw new Error("Something went wrong")

          const data = await res.json()

          // console.log(data)

          setOutput(data.rates[currency2])
        } catch (err) {
          console.log(err.message)
        } finally {
          setIsLoading(false)
        }
      }

      if (!amount) return

      if (currency1 === currency2) return setOutput(amount)

      fetchData()

      return function () {
        controller.abort()
      }
    },
    [amount, currency1, currency2]
  )

  return (
    <div>
      <input
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        type="text"
      />
      <select value={currency1} onChange={(e) => setCurrency1(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={currency2} onChange={(e) => setCurrency2(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {amount === 0
          ? "Enter an amount"
          : isLoading
          ? "Converting"
          : `${output} ${currency2}`}
      </p>
    </div>
  )
}
