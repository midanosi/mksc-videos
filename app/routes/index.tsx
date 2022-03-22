import { Link } from "remix";
import { getModeColor } from "~/utils";

type Mode = "nonzzmt" | "zzmt" | "sc" | "nolapskips";
interface ModeMenuItem {
  id: Mode;
  title: string;
  desc: string;
  desc2?: string;
}
const modes: ModeMenuItem[] = [
  {
    id: "nonzzmt",
    title: "Non-ZZMT",
    desc: "PP Rules (Non-SC)",
    desc2: "ZZMTs banned",
  },
  {
    id: "zzmt",
    title: "ZZMT",
    desc: "PP Rules (Non-SC)",
    desc2: "ZZMTs allowed",
  },
  {
    id: "sc",
    title: "SC",
    desc: "PP Rules (SC)",
    desc2: "Ticking, lapskips, and all shortcuts are allowed",
  },
  {
    id: "nolapskips",
    title: "No Lapskips",
    desc: "SC, but no lapskips",
  },
];

export default function Index() {
  return (
    <main className="relative min-h-screen p-12 bg-white">
      <h1 className="mb-12 text-2xl">MKSC Videos</h1>
      <div className="inline-grid grid-cols-2 grid-rows-2 gap-4 col">
        {modes.map((mode) => {
          const modeColor = getModeColor(mode.id);
          return (
            <div
              key={mode.id}
              className="w-56 px-4 py-2 bg-gray-100 border-2 rounded-lg"
            >
              <h3
                style={{ color: modeColor }}
                className={`text-3xl font-bold transition hover:opacity-60`}
              >
                <a href={`/picktrack?mode=${mode.id}`}>{mode.title}</a>
              </h3>
              <ul className="ml-4 list-disc">
                <li className="text-sm text-opacity-60">{mode.desc}</li>
                {mode.desc2 ? (
                  <li className="text-sm text-opacity-60">{mode.desc2}</li>
                ) : null}
              </ul>
            </div>
          );
        })}
      </div>
    </main>
  );
}
