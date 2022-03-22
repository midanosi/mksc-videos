import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { courses } from "~/courses";
import { getModeColor } from "~/utils";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");
  return { mode };
};

interface ITrack {
  cid: number;
  name: string;
}
const tracks: ITrack[] = courses
  .map((course, idx) => [
    { cid: idx * 2, name: course },
    // { cid: idx * 2 + 1, name: course },
  ])
  .flat();

function stripRetroFromName(name: string) {
  return name.replace("Retro ", "");
}

const TrackCell = ({ track, mode }) => {
  return (
    <a
      key={track.cid}
      href={`/videos/?cid=${track.cid}&mode=${mode}`}
      className="px-1 py-2 transition rounded w-fit hover:bg-gray-200"
    >
      <h3
        className="w-full text-center whitespace-nowrap"
        // style={{ width: "110%", marginLeft: "-5%" }}
      >
        {stripRetroFromName(track.name)}
      </h3>
      <img
        src={`/images/crs${track.cid / 2 + 1}.png`}
        alt={`thumbnail for ${track.name}`}
        className="w-32 h-20 mx-auto"
      />
    </a>
  );
};

export default function PickTrack() {
  const { mode } = useLoaderData();

  return (
    <main className="relative min-h-screen p-12 bg-white">
      <h1 className="mb-6 text-2xl">Pick Track</h1>
      <h3
        style={{ color: getModeColor(mode) }}
        className={`text-3xl font-bold transition hover:opacity-60`}
      >
        {mode}
      </h3>
      <div className="px-4 py-2 mx-auto">
        <h2 className="text-xl font-extrabold mt-">GBA</h2>
        <div className="grid grid-cols-5 mx-auto mb-12 w-fit justify-items-center gap-y-6 gap-x-2">
          {tracks.slice(0, 20).map((track) => (
            <TrackCell key={track.cid} track={track} mode={mode} />
          ))}
        </div>
        <h2 className="text-xl font-extrabold">Retro</h2>
        <div className="grid grid-cols-5 mb-12 gap-y-4">
          {tracks.slice(20, 40).map((track) => (
            <TrackCell key={track.cid} track={track} mode={mode} />
          ))}
        </div>
      </div>
    </main>
  );
}
