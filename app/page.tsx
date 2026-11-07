
"use client";

import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [frequency, setFrequency] = useState("Quarterly");
  const [result, setResult] = useState<number | null>(null);

  const calculateFD = () => {
    const n =
      frequency === "Quarterly" ? 4 :
      frequency === "Half Yearly" ? 2 :
      frequency === "Yearly" ? 1 : 4;

    const maturity =
      amount * Math.pow(1 + rate / (100 * n), n * years);

    setResult(maturity);
  };

  const format = (value: number) =>
    "₹" + value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-2">FD Calculator</h1>
        <p className="text-gray-500 mb-8">
          Calculate your Fixed Deposit returns.
        </p>

        {/* Deposit Amount */}
        <label className="font-semibold">
          Deposit Amount (₹)
        </label>

        <input
          type="range"
          min="10000"
          max="5000000"
          step="10000"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full my-4 accent-blue-600"
        />

        <div className="flex justify-between mb-8">
          <span>₹10,000</span>
          <b>{format(amount)}</b>
          <span>₹50,00,000</span>
        </div>

        {/* Rate */}
        <label className="font-semibold">
          Rate of Return (%)
        </label>

        <input
          type="range"
          min="5"
          max="30"
          step="0.25"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full my-4 accent-blue-600"
        />

        <div className="flex justify-between mb-8">
          <span>5%</span>
          <b>{rate}%</b>
          <span>30%</span>
        </div>

        {/* Interest Payout */}
        <label className="font-semibold">
          Interest Payout
        </label>

        <div className="flex flex-wrap gap-3 my-5">
          {["Quarterly", "Half Yearly", "Yearly", "At Maturity"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setFrequency(item)}
                className={`px-4 py-2 rounded-full ${
                  frequency === item
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Time Period */}
        <label className="font-semibold">
          Time Period (Years)
        </label>

        <input
          type="range"
          min="1"
          max="50"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="w-full my-4 accent-blue-600"
        />

        <div className="flex justify-between mb-8">
          <span>1 Year</span>
          <b>{years} Years</b>
          <span>50 Years</span>
        </div>

        {/* Calculate */}
        <button
          onClick={calculateFD}
          className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700"
        >
          Calculate
        </button>

        {/* Result */}
        {result !== null && (
          <div className="mt-8 bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">
              FD Result
            </h2>

            <p>Deposit Amount: {format(amount)}</p>
            <p>Interest Rate: {rate}%</p>
            <p>Duration: {years} Years</p>
            <p>Interest Payout: {frequency}</p>

            <hr className="my-4" />

            <p className="text-gray-600">
              Total Interest Earned
            </p>

            <h2 className="text-2xl font-bold text-green-600">
              {format(result - amount)}
            </h2>

            <p className="text-gray-600 mt-3">
              Maturity Amount
            </p>

            <h2 className="text-3xl font-bold text-blue-700">
              {format(result)}
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}
