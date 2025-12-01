import express from "express"
import axios from "axios"
import cors from "cors"
import * as cheerio from "cheerio"

const app = express()

app.use(cors())
const tempartist = "Aerosmith"
const tempsong = "dream-on"


app.get("/", (req, res) => {
    res.send("Api running.")
})

app.get("/lyrics", async (req, res) => {
    const artist = req.query.artist;
    const song = req.query.song;

    const url = `https://genius.com/${artist}-${song}-lyrics`;
    const { data } = await axios(url);

    const $ = cheerio.load(data);
    let lyrics = [];

    $('div[data-lyrics-container="true"]').each((i, el) => {
        $(el).contents().each((_, node) => {

            if (node.type === "text") {
                const line = $(node).text().trim();
                if (line.length) lyrics.push(line);
            }

            if (node.type === "tag") {
                const line = $(node)
                    .text()
                    .replace(/&ZeroWidthSpace;/g, "")
                    .trim();

                if (line.length) lyrics.push(line);
            }

        });
    });

    res.send(lyrics.slice(1));
});

app.listen(5000, () => {
    console.log("server live at: http://localhost:5000")
})