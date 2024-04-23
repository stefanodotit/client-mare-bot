import "./App.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "./service/firebase";
import { DateTime } from "luxon";
import { For, createSignal } from "solid-js";
import Title from "./components/title";
declare const window: any;

function App() {
  const [logs, setLogs]: any = createSignal([]);

  const database = getDatabase(app);
  const botLogsRef = ref(
    database,
    "mare_bot/logs/" + DateTime.fromJSDate(new Date()).toISODate()
  );

  onValue(botLogsRef, (snapshot) => {
    const data: any = snapshot.val();
    setLogs(Object.values(data));
  });

  const chooseBg = (log: string) => {
    if (log.startsWith("[CONFIG]")) {
      return "bg-sky-600";
    }
    if (log.startsWith("[INFO]")) {
      return "bg-amber-600";
    }
    if (log.startsWith("[BOT][LOGIN]")) {
      return "bg-indigo-600";
    }
    if (log.startsWith("*ERROR*")) {
      return "bg-red-600";
    }
    if (log.startsWith("*SUCCESS*")) {
      return "bg-green-600";
    }
    return "bg-pink-600";
  };
  

  return (
    <>
      <Title />
      <div class="container mx-auto px-4 mt-10">
        <button onClick={() => window.PushAlertCo.forceSubscribe()}>Subscribe</button>
        <ol class="relative border-l border-gray-200 dark:border-gray-700">
          <For each={logs()}>
            {(log) => (
              <li class="mb-10 ml-6">
                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <img
                    class="rounded-full shadow-lg"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Bonnie image"
                  />
                </span>
                <div
                  class={`items-center justify-between p-4 rounded-lg shadow-sm sm:flex ${chooseBg(
                    log.log
                  )} `}
                >
                  <time class="mb-1 text-xs font-normal text-white sm:order-last sm:mb-0">
                    {DateTime.fromISO(log.ts).toLocaleString(
                      DateTime.DATETIME_FULL_WITH_SECONDS
                    )}
                  </time>
                  <div class="text-sm font-normal text-white">{log.log}</div>
                </div>
                {log.extra && (
                  <>
                    <div
                      class={`items-center mt-5 p-4 rounded-lg shadow-sm sm:flex ${chooseBg(
                        log.log
                      )} `} style={{"word-wrap": "break-word"}}
                    >
                      {log.extra}
                    </div>
                    {log.screenshot && (
                      <img
                        class="mx-auto"
                        src={`data:image/jpeg;charset=utf-8;base64, ${log.screenshot}`}
                      />
                    )}
                  </>
                )}
              </li>
            )}
          </For>
        </ol>
      </div>
    </>
  );
}

export default App;
