import { prisma } from "~/db.server";

export type { mkscvids } from "@prisma/client";

type Mode = "nonzzmt" | "zzmt" | "sc" | "nolapskips";
const modeNameToModeId = {
  nonzzmt: 0,
  zzmt: 1,
  sc: 2,
  nolapskips: 3,
};

export function getVideoListItems({
  cid,
  modeName,
}: {
  cid: number;
  modeName: Mode;
}) {
  console.log(`modeName`, modeName)
  const modeId = modeNameToModeId[modeName];
  console.log(`modeId`, modeId)
  return prisma.mkscvids.findMany({
    where: { cid: Number(cid), mode: modeId },
    // select: { cid: true, link: true, time: true },
    orderBy: { time: "asc" },
  });
}
