import { Configuration, OpenAIApi } from 'openai';

export async function POST(req) {
    const { prompt } = await req.json();

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    try {
        // Send a request to the OpenAI API to create a chat completion using the specified model
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                { role: 'user', content: prompt },
            ],
            max_tokens: 100,
        });

        const result = response.data.choices[0].message.content.trim();
        return new Response(JSON.stringify({ result }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error querying OpenAI:', error);
        return new Response(JSON.stringify({ error: 'Error querying OpenAI' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}