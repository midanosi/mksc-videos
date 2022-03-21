import { Link, useLoaderData } from "remix";
import { getModeColor } from "~/utils";
import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");
  return { mode };
};

interface ITrack {
  cid: number;
  title: string;
}
const tracks: ITrack[] = [
  {
    cid: 0,
    title: "Peach Circuit",
  },
];

export default function PickTrack() {
  const { mode } = useLoaderData();

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <h1>Pick Track</h1>
      <h3>Mode: {mode}</h3>
      <div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-5 mt-6 gap-y-2">
          {tracks.map((track) => {
            return (
              <a
                key={track.cid}
                href={`/videos/?cid=${track.cid}&mode=${mode}`}
                className={`relative`}
              >
                <h3 className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-black-700 top-2 left-1/2 bg-opacity-20">
                  {track.title}
                </h3>
                <img
                  src={`/${track.cid}.png`}
                  alt={`thumbnail for ${track.title}`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
