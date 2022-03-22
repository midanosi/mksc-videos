import { json, useLoaderData, Outlet, Link } from "remix";
import type { LoaderFunction } from "remix";
import { courses } from "~/courses";
import { getModeColor } from "~/utils";

// import { requireUserId } from "~/session.server";
// import { useUser } from "~/utils";
import { getVideoListItems } from "~/models/video.server";

type LoaderData = {
  mkscvids: Awaited<ReturnType<typeof getVideoListItems>>;
  cid: number;
  mode: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const cid = url.searchParams.get("cid");
  const mode = url.searchParams.get("mode");
  const mkscvids = await getVideoListItems({ cid, modeName: mode });
  return json<LoaderData>({ mkscvids, cid, mode });
};

const subtractOneIfOdd = (i) => {
  if (i % 2 === 0) {
    return i;
  }
  return i - 1;
};
const getCourseName = (cid: number) => {
  const courseCID = subtractOneIfOdd(cid);
  const arrayIndex = courseCID / 2;
  return courses[arrayIndex];
};
const getCourseImgIndex = (cid: number) => {
  const courseCID = subtractOneIfOdd(cid);
  const imageIndex = courseCID / 2 + 1;
  return imageIndex;
};

export default function NotesPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="flex flex-col h-full min-h-screen p-12">
      <header className="fixed top-0 left-0 flex justify-end w-full p-2">
        <h1 className="p-2 text-xl font-bold border-2 border-black rounded-lg hover:bg-gray-200">
          <Link to="/"> Home</Link>
        </h1>
      </header>

      <div className="flex items-center gap-10 mx-auto">
        <div>
          <h2 className="text-2xl font-bold">{getCourseName(data.cid)}</h2>
          <h3
            style={{ color: getModeColor(data.mode) }}
            className={`text-3xl font-bold transition hover:opacity-60`}
          >
            {data.mode}
          </h3>
        </div>
        <img
          src={`/images/crs${getCourseImgIndex(data.cid)}.png`}
          alt="track thumbnail"
          className="w-32 h-20 m-0"
        />
      </div>
      <div className="flex gap-4 p-6 mx-auto">
        <a
          href={`/videos/?cid=${Number(data.cid) - 1}&mode=${data.mode}`}
          className={`rounded border-2 px-4 py-2 ${
            data.cid % 2 === 0
              ? "pointer-events-none border-gray-500 underline"
              : "hover:border-gray-400"
          }`}
        >
          Course
        </a>
        <a
          href={`/videos/?cid=${Number(data.cid) + 1}&mode=${data.mode}`}
          className={`rounded border-2 px-4 py-2 ${
            data.cid % 2 === 1
              ? "pointer-events-none border-gray-500 underline "
              : "hover:border-gray-400"
          }`}
        >
          Flap
        </a>
      </div>

      <main className="flex px-12 py-2 mx-auto bg-white">
        <div className="border-r shadow-md bg-gray-50 sm:rounded-lg">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Player
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  URL
                </th>
              </tr>
            </thead>
            <tbody>
              {data.mkscvids.map((mkscvid) => {
                return (
                  <tr
                    key={mkscvid.cid}
                    className="bg-white border-b dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td className="px-6 py-2 font-medium text-gray-900 text-md whitespace-nowrap dark:text-white">
                      {mkscvid.time}
                    </td>
                    <td className="px-6 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-white">
                      {mkscvid.player}
                    </td>
                    <td className="px-6 py-2 text-sm whitespace-nowrap">
                      <a href={`https://youtu.be/${mkscvid.link}`}>URL</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
