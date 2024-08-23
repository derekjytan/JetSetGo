'use client'
import { useState } from "react";
import Amadeus from 'amadeus'

export default function Home() {
  const [query, setQuery] = useState('Testy');
  const [result, setResult] = useState('');

  const handleSearch = async () => {
    const response = await fetch('/apis/amadeus/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({keyword: query}),
    })
    
    if(response) {
      const data = await response.json();
      setResult(JSON.stringify(data));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <input
                        type="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black"
                    />
      <button onClick={handleSearch} className="bg-blue-400">Search test</button>
      <p>{result}</p>
    </main>
  );
}
