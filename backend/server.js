import express from "express"
import axios from "axios"
import cors from "cors"
import * as cheerio from "cheerio"

const app = express()

app.use(cors())
const tempartist = "Aerosmith"
const tempsong = "dream-on"


app.get("/",(req, res)=>{
    res.send("Api running.")
})

app.get("/lyrics", async(req, res)=>{
    const artist = req.query.artist
    const song = req.query.song

    //dummy data
    // const artist = tempartist
    // const song = tempsong
    // https://genius.com/Playboi-carti-magnolia-lyrics
    const url = `https://genius.com/${artist}-${song}-lyrics`
    const {data} = await axios(url)

    const $ = cheerio.load(data)
    const lyrics = []
   $('div[data-lyrics-container="true"] span[class*="ReferentFragment-desktop__Highlight"]').each((i, el) => {
        const line = $(el).html()
            .replace(/<br>/g, "\n") // keep line breaks properly
            .replace(/&ZeroWidthSpace;/g, "") // remove invisible chars
            .trim();

        lyrics.push(line);
    });

    res.send(lyrics)
})

app.listen(5000,()=>{
    console.log("server live at: http://localhost:5000")
})