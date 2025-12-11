import { useEffect } from 'react'
import { useState, useMemo } from 'react'
function App() {

  const [artist, setArtist] = useState("")
  const [song, setSong] = useState("")
  const [lyrics, setLyrics] = useState([])
  const [focused, setFocused] = useState(false)
  const songs =[
  {
    "id": "dream-on",
    "title": "Dream On",
    "artist": "Aerosmith",
    "album": "Aerosmith",
    "release_year": 1973,
    "genre": "Rock",
    "duration": "4:28"
  },
  {
    "id": "on-that-time",
    "title": "On That Time",
    "artist": "playboi carti",
    "album": "Single",
    "release_year": 2020,
    "genre": "Alternative",
    "duration": "3:35"
  },
  {
    "id": "let-it-happen",
    "title": "Let It Happen",
    "artist": "Tame Impala",
    "album": "Currents",
    "release_year": 2015,
    "genre": "Psychedelic Pop",
    "duration": "7:48"
  },
  {
    "id": "crank",
    "title": "Crank",
    "artist": "Playboi Carti",
    "album": "Music",
    "release_year": 2024,
    "genre": "Pop rap",
    "duration": "2:27"
  },
  {
    "id": "on-sight",
    "title": "On Sight",
    "artist": "Kanye West",
    "album": "Yeezus",
    "release_year": 2013,
    "genre": "Experimental Hip-Hop",
    "duration": "2:36"
  },
  {
    "id": "tore-up",
    "title": "Tore Up",
    "artist": "Don Toliver",
    "album": "Hardstone Psycho",
    "release_year": 2024,
    "genre": "Rage",
    "duration": "3:11"
  },
  {
    "id": "all-red",
    "title": "All Red",
    "artist": "Playboi Carti",
    "album": "Single",
    "release_year": 2021,
    "genre": "Pop-rap",
    "duration": "2:58"
  }
]


  const suggestions = useMemo(() => {
    return songs.filter(s =>
      s.title.toLowerCase().includes(song.toLowerCase().trim())
    );
  }, [song, songs]);


  const getLyrics = async () => {
    if (artist.trim() === "" || song.trim() === "") return

    let artist_link_format = artist.charAt(0).toUpperCase() + artist.slice(1)
    artist_link_format = artist_link_format.replace(/ /g, "-")

    let song_link_format = song.replace(/ /g, "-")
    console.log(artist_link_format)
    console.log(song_link_format)

    // http://localhost:5000/lyrics?artist=Kanye-west&song=on-sight
    try {
      let data = await fetch(`http://localhost:5000/lyrics?artist=${artist_link_format}&song=${song_link_format}`).then(data => data.json())
      let lyricsToSet = []
      data.forEach((line, index) => {
        lyricsToSet.push(line)
      })
      setLyrics(lyricsToSet)
      console.log(data)
    } catch (err) {
      console.error("Error while fetching")
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6EAF8] to-[#FDEDEC] flex flex-col items-center p-10">

      {/* Heading */}
      <h1 className="text-5xl font-extrabold tracking-wide mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-md">
        🎵 Lyrics Finder
      </h1>

      {/* Input Box */}
      <div className="w-[60rem] bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col gap-8 relative">

        <div className="flex flex-col">
          <label className="text-lg font-semibold pb-1 text-gray-700">Song</label>
          <input
            className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 text-lg outline-none transition-all"
            placeholder="Dream On"
            value={song}
            onChange={(e) => { setSong(e.target.value) }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        {
          song && focused && suggestions.length > 0 &&
          <div className='w-full max-h-[10rem] bg-white rounded-lg p-4 border-2 border-gray-400 overflow-y-scroll absolute z-100 top-[7rem]'
            onMouseDown={(e) => e.preventDefault()}
          >
            <ul className='flex flex-col gap-2'>
              {
                suggestions.map((suggestion, key) => {
                  return <li className='bg-[#ECECF2] p-2 rounded cursor-pointer' key={key} onClick={() => {
                    setSong(suggestion.title)
                    setArtist(suggestion.artist)
                  }}>{suggestion.title}</li>
                })
              }
            </ul>
          </div>
        }
        <div className="flex flex-col">
          <label className="text-lg font-semibold pb-1 text-gray-700">Artist</label>
          <input
            className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 text-lg outline-none transition-all"
            placeholder="Aerosmith"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>

        <button
          onClick={getLyrics}
          className="w-full py-3 text-xl font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md"
        >
          Fetch Lyrics
        </button>
      </div>

      {/* Lyrics Box */}
      <div className="mt-10 w-[60rem] bg-white/80 backdrop-blur shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Lyrics</h2>

        <div className="border border-gray-300 h-[30rem] rounded-xl p-5 overflow-y-auto whitespace-pre-wrap text-lg leading-relaxed tracking-wide selection:bg-purple-300 font-medium">
          {lyrics.length > 0 ? lyrics.map((line, i) => (<p key={i} className="mb-3">{line}</p>)) :
            <p className="italic text-gray-500 text-center mt-20">Search something to display lyrics...</p>
          }
        </div>
      </div>
    </div>

  )
}

export default App