import mongoose, { mongo } from "mongoose"
import Song from "./models/Song.js"

async function seed(){

    const songs =[
      {
        "title": "Dream On",
        "artist": "Aerosmith",
        "album": "Aerosmith",
      },
      {
        "title": "On That Time",
        "artist": "playboi carti",
        "album": "Single",
      },
      {
        "title": "Let It Happen",
        "artist": "Tame Impala",
        "album": "Currents",
      },
      {
        "title": "Crank",
        "artist": "Playboi Carti",
        "album": "Music",
      },
      {
        "title": "On Sight",
        "artist": "Kanye West",
        "album": "Yeezus",
      },
      {
        "title": "Tore Up",
        "artist": "Don Toliver",
        "album": "Hardstone Psycho",
      },
      {
        "title": "All Red",
        "artist": "Playboi Carti",
        "album": "Single"
      }
    ]
    
    await Song.deleteMany({})
    await Song.insertMany(
        songs.map(s=>({
            ...s, searchKey: `${s.title} ${s.artist}`.toLowerCase()
        }))
    )
    
    console.log("Songs inserted")
    
   await mongoose.connection.close()
   process.exit()
}

seed()