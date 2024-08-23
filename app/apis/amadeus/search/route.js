import Amadeus from 'amadeus'
import { NextResponse } from 'next/server';

const API_KEY = process.env.AMADEUS_API;
const API_SECRET = process.env.AMADEUS_SECRET;

const amadeus = new Amadeus({
    clientId: API_KEY,
    clientSecret: API_SECRET,
    });


export async function POST(req) {
    const { keyword } = await req.json();

    const response = await amadeus.referenceData.locations.get({
        keyword,
        subType: Amadeus.location.city,
    });
    
    console.log('pen: ', response)

    try {
        return NextResponse.json(response, { status: 200 });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}