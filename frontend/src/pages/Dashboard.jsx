import { useState } from "react"

export default function Dashboard() {
    const [amount, setAmount] = useState("")
    const [curency, setCurrency] = useState("USD")
    return (
        <div>
            <h1>Forex Comparison Dashboard</h1>
            {/* Input Section */}
            <div>
                <input type="number"
                    placeholder="Enter Amount"
                    className="w-full p-3 border rounded mb-4"
                    onChange={(e) => setAmount(e.target.value)}
                />

                <select className="w-full p-3 border rounded mb-4" onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
        </div>
    )
}