import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
    console.log("Testing API Key:", apiKey.substring(0, 10) + "...");

    const models = ['gemini-2.5-flash', 'gemini-2.0-flash'];

    for (const modelName of models) {
        try {
            console.log(`\nTesting model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, say 'test' if you work.");
            const response = await result.response;
            console.log(`SUCCESS [${modelName}]:`, response.text());
        } catch (err) {
            console.error(`FAILURE [${modelName}]:`, err.message);
        }
    }
}

test();
