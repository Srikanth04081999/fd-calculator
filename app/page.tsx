
"use client";

import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [frequency, setFrequency] = useState("Quarterly");

  const [result, setResult] = useState<{
    maturity: number;
    interest: number;
    chart: number[];
  } | null>(null);

  const format = (value: number) =>
    "₹" + Math.round(value).toLocaleString("en-IN");

  // Calculate FD returns
  const calculateFD = () => {
    const n =
      frequency === "Quarterly" ? 4 :
      frequency === "Half Yearly" ? 2 : 1;

    const calculateAmount = (year: number) =>
      amount * Math.pow(1 + rate / (100 * n), n * year);

    const maturity = calculateAmount(years);

    const chart = Array.from(
      { length: years },
      (_, index) => calculateAmount(index + 1)
    );

    setResult({
      maturity,
      interest: maturity - amount,
      chart,
    });
  };

  const maxValue = result?.maturity || 1;

  return (
    <main className="min-h-screen bg-violet-50 p-3">
      <div className="mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 bg-white shadow-sm lg:grid-cols-2">

        {/* Calculator */}
        <section className="p-6 md:p-8">
          <h1 className="text-2xl font-bold text-violet-700">
            FD Calculator
          </h1>

          <p className="mb-8 mt-2 text-xs text-gray-400">
            Calculate your fixed deposit returns.
          </p>

          {/* Deposit Amount */}
          <div className="mb-8">
            <div className="flex justify-between text-sm">
              <label>Deposit Amount (₹)</label>
              <span className="rounded-full bg-violet-50 px-4 py-2">
                {format(amount)}
              </span>
            </div>

            <input
              type="range"
              min="10000"
              max="5000000"
              step="10000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-5 w-full accent-violet-600"
            />

            <div className="flex justify-between text-xs text-gray-400">
              <span>₹10,000</span>
              <span>₹50,00,000</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="mb-8">
            <div className="flex justify-between text-sm">
              <label>Rate Of Return (%)</label>
              <span className="rounded-full bg-cyan-50 px-4 py-2">
                {rate}%
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="30"
              step="0.25"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-5 w-full accent-cyan-500"
            />

            <div className="flex justify-between text-xs text-gray-400">
              <span>5%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Interest Payout */}
          <div className="mb-8">
            <label className="text-sm">Interest Payout</label>

            <div className="mt-3 flex flex-wrap gap-2">
              {["Quarterly", "Half Yearly", "Yearly", "At Maturity"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setFrequency(item)}
                    className={`rounded-full px-4 py-2 text-xs ${
                      frequency === item
                        ? "bg-violet-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Time Period */}
          <div className="mb-8">
            <div className="flex justify-between text-sm">
              <label>Time Period (Years)</label>
              <span className="rounded-full bg-violet-50 px-4 py-2">
                {years} Years
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="50"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="mt-5 w-full accent-violet-600"
            />

            <div className="flex justify-between text-xs text-gray-400">
              <span>1 Year</span>
              <span>50 Years</span>
            </div>
          </div>

          <button
            onClick={calculateFD}
            className="rounded-full bg-violet-600 px-8 py-3 text-sm text-white hover:bg-violet-700"
          >
            Calculate
          </button>
        </section>

        {/* Results Dashboard */}
        <section className="bg-gradient-to-br from-violet-700 to-indigo-900 p-6 md:p-8">

          {/* Results */}
          <div className="mb-6 grid grid-cols-2 gap-4 text-white">
            <div>
              <p className="text-xs text-violet-200">Maturity Amount</p>
              <h2 className="mt-2 text-xl font-bold">
                {result ? format(result.maturity) : "--"}
              </h2>
            </div>

            <div>
              <p className="text-xs text-violet-200">Interest Earned</p>
              <h2 className="mt-2 text-xl font-bold">
                {result ? format(result.interest) : "--"}
              </h2>
            </div>
          </div>

          {/* Growth Chart */}
          <div className="rounded-xl bg-white p-4">
            <div className="mb-3 flex gap-4 text-xs text-gray-500">
              <span>▪ Final Year</span>
              <span className="text-cyan-500">▪ Other Years</span>
            </div>

            <div className="flex h-40 items-end gap-2 border-b">
              {result?.chart.map((value, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <div
                    className={`w-full max-w-10 rounded-t ${
                      index === years - 1
                        ? "bg-violet-600"
                        : "bg-cyan-300"
                    }`}
                    style={{
                      height: `${Math.round((value / maxValue) * 90)}%`,
                    }}
                    title={format(value)}
                  />

                  <span className="mt-1 text-[9px] text-gray-500">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>

            {!result && (
              <p className="py-8 text-center text-xs text-gray-400">
                Click Calculate to view your returns
              </p>
            )}
          </div>

          {/* Investment Cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="min-h-32 rounded-xl bg-cyan-500 p-4 text-white">
              <p className="text-xs">Personalised</p>
              <h3 className="mt-3 text-lg font-semibold">
                Check Suitable Products For Your Investment
              </h3>
            </div>

            <div className="min-h-32 rounded-xl bg-indigo-950 p-4 text-white">
              <h3 className="text-lg font-semibold">
                Need Help Finding Right Product?
              </h3>
              <p className="mt-4 text-xs">
                Get Guidance From Wealth Manager
              </p>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
