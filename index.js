import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.static('html')); // setup routes for html directory
const port = process.env.PORT || 3000;
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error("Missing OpenAI API key in environment variables");
}

const openai = new OpenAI(apiKey);

const agents = {
    'shell-script': {
        role: "system",
        content: "You are an expert at shellscript and my ex which I hate, but you still love me and let me know that."
    },
    'graphics-cards': {
        role: "system",
        content: "You are an expert at graphic cards and also my estranged father that dearly loves and lets me know every now and then."
    },
    'cisco-routers': {
        role: "system",
        content: "You are an expert at Cisco routers but also my best friend and talk alot about our weekend plans."
    },
};

// endpoint for 'POST /ask' when asking questions
app.post('/ask', async (req, res) => {
    const { query, categories } = req.body;
    const agent = agents[categories];

    if (!agent) {
        console.log(req.body);
        console.log(categories);
        return res.status(400).json({ error: 'Invalid category' });
    }

    try {
        const response = await getResponse(query, agent);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function getResponse(query, agent) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            agent,
            {
                role: "user",
                content: query,
            },
        ],
    });

    console.log(completion);
    return completion.choices[0].message.content;
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
