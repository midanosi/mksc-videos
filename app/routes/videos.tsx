import { json, useLoaderData, Outlet, Link } from "remix";
import type { LoaderFunction } from "remix";
import { courses } from "~/courses";

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
  const mkscvids = await getVideoListItems({ cid, mode });
  return json<LoaderData>({ mkscvids, cid, mode });
};

const subtractOneIfOdd = (i) => {
  if (i % 2 === 0) {
    return i;
  }
  return i - 1;
};
const getCourseName = (cid: number) => {
  const arrayIndex = subtractOneIfOdd(cid);
  return courses[arrayIndex];
};

export default function NotesPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="flex flex-col h-full min-h-screen">
      <header className="flex items-center justify-between p-4 text-white bg-slate-800">
        <h1 className="text-3xl font-bold">
          <Link to="/"> Home</Link>
        </h1>
      </header>

      <h2>{getCourseName(data.cid)}</h2>
      <h3>{data.mode}</h3>

      <main className="flex h-full bg-white">
        <div className="h-full border-r shadow-md w-80 bg-gray-50 sm:rounded-lg">
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
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
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
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {mkscvid.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-white">
                      {mkscvid.player}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-white">
                      <a href={mkscvid.link}>URL</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
