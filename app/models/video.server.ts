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
  const modeId = modeNameToModeId[modeName];
  return prisma.mkscvids.findMany({
    where: { cid: Number(cid), mode: modeId },
    // select: { cid: true, link: true, time: true },
    orderBy: { time: "asc" },
  });
}
