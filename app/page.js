'use client'
import { useState } from "react";
const Amadeus = require("amadeus");

const API_KEY = process.env.AMADEUS_API;
const API_SECRET = process.env.AMADEUS_SECRET;

const amadeus = new Amadeus({
  clientId: API_KEY,
  clientSecret: API_SECRET,
});

export default function Home() {
  const [test, setTest] = useState('Chin');
  const [result, setResult] = useState('')

  const handleSearch = async () => {
    const { keyword } = 'Test';
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: Amadeus.location.city,
    });
    try {
      await setResult(json(JSON.parse(response.body)));
    } catch (err) {
      await console.log(err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={handleSearch}>Search test</button>
      <p>{result}</p>
    </main>
  );
}
