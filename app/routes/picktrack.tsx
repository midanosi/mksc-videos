import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { courses } from "~/courses";

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
                  {track.name}
                </h3>
                <img
                  src={`/images/crs${track.cid / 2 + 1}.png`}
                  alt={`thumbnail for ${track.name}`}
                  height="80px"
                  width="120px"
                />
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
