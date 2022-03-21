import { prisma } from "./app/db.server";
import fetch from 'node-fetch'

// export function getVideoListItems({
//   cid,
//   modeName,
// }) {
//   const modeId = modeNameToModeId[modeName];
//   return prisma.mkscvids.findMany({
//     where: { cid: Number(cid), mode: modeId },
//     // select: { cid: true, link: true, time: true },
//     orderBy: { time: "asc" },
//   });
// }

export async function scrapeYTAndAddNames() {
  // const records = await prisma.mkscvids.findFirst({
  //   where: { player: undefined },
  // });
  const recordsWithoutName = await prisma.mkscvids.findMany({
    where: { player: '' },
  })
  console.log(`recordsWithoutName.length`, recordsWithoutName.length)
  let i=0
  for (let record of recordsWithoutName) {
    i++
    console.log(`i`, i)
    if (record === null) return 
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${record.link}&key=AIzaSyATN_FTkF9ehCDRJa4IaketQD3jMDlNTw8&part=snippet&fields=items(snippet,id)`;
    const apiResultResponse = await fetch(url);
    const apiResultData = await apiResultResponse.json()
    // console.dir(apiResultData, { depth: null})

    const channelId = apiResultData.items?.[0]?.snippet.channelId
    const channelName = apiResultData.items?.[0]?.snippet.channelTitle
    if (!channelId) continue

    const ytNameRecord = await prisma.mkscytnames.findFirst({
      where: { id: channelId },
    });
    const name = ytNameRecord?.name ?? channelName ?? ''

    // add playerName to record
    await prisma.mkscvids.update({
      where: {link:  record.link},
      data: {
        player: name
      }
    })
  }
}
scrapeYTAndAddNames()
// get all records without a name

// scrape YT 1 at a time (can be slow)
