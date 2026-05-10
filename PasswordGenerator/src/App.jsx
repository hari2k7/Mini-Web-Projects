import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-950 flex items-center justify-center px-4">

      <div className="w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            Password Generator
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Create strong and secure passwords instantly
          </p>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            value={password}
            className="w-full bg-black/40 border border-gray-700 text-green-400 font-mono text-lg rounded-2xl px-5 py-4 pr-28 outline-none focus:border-cyan-400 transition-all duration-300"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipboard}
            className="absolute right-2 top-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Copy
          </button>
        </div>

        {copied && (
          <p className="text-green-400 text-center text-sm mb-4 animate-pulse">
            Password copied successfully ✓
          </p>
        )}

        <div className="space-y-6">

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-white font-medium">
                Password Length
              </label>

              <span className="text-cyan-400 font-bold text-lg">
                {length}
              </span>
            </div>

            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 accent-cyan-400"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <label htmlFor="number" className="text-white cursor-pointer">
                Numbers
              </label>

              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev)
                }}
                id="number"
                className="w-5 h-5 accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <label htmlFor="charInput" className="text-white cursor-pointer">
                Characters
              </label>

              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }}
                id='charInput'
                className="w-5 h-5 accent-pink-400 cursor-pointer"
              />
            </div>

          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          Built with React + Tailwind CSS
        </div>

      </div>
    </div>
  )
}

export default App
