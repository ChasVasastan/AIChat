import OpenAI from "openai";
import dotenv from ".env";
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error("Missing OpenAI API key in environment variables");
}

document.getElementById("promptForm").addEventListener("submit", async (event) => {
    event.preventDefault();

const openai = new OpenAI(apiKey);

const prompt = document.getElementById("prompt").value;
const responses = document.getElementById("responses");
responses.innerHTML = "<p>Loading...</p>";

const agents = [
    { role: "system", content: "You are an expert at shellscript and my ex which I hate, but you still love me and let me know that." },
    { role: "system", content: "You are an expert at graphic cards and also my estranged father that dearly loves and lets me know every now and then." },
    { role: "system", content: "You are an expert at Cisco routers but also my best friend and talk alot about our weekend plans." },
];


for (const agent of agents) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            agent,
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    console.log(completion.choices[0].message);
}

});