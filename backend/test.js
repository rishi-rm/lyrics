// import axios from "axios";
// import * as cheerio from "cheerio";
// const url = "https://genius.com/Playboi-carti-magnolia-lyrics"

// async function scrape(){
//     const {data} = await axios.get(url)
//     const $ = cheerio.load(data)


//     const spans = [];
//     $('span[class*="ReferentFragment-desktop__Highlight"]').each((i, el)=>{
//         spans.push($(el).text().trim())
//     })

//     console.log(spans)
// }

// scrape()
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
let string = "this"
console.log(string)
string = capitalize(string)
console.log(string)