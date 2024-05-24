const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());

app.use(express.json());

const OpenAI = require("openai");
const config = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(config);

app.get("/get-sample-prompts", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: process.env.GET_SAMPLE_PROMPTS,
        },
      ],
      model: "gpt-4o",
    });

    return res.status(201).json({ result: completion.choices[0].message });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Internal Server Error" });
  }
});

app.post("/create-chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o",
    });

    return res.status(201).json({ result: completion.choices[0].message });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => console.log("Proxy server is up"));
