import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";

/** A server function: this handler runs in the Worker, never in the browser. */
const getGreeting = createServerFn().handler(() => ({
  renderedAt: new Date().toISOString(),
  runtime: navigator.userAgent,
}));

export const Route = createFileRoute("/")({
  loader: () => getGreeting(),
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();
  const [count, setCount] = useState(0);

  return (
    <main className="mx-auto mt-8 flex max-w-xl flex-col gap-4">
      <h1 className="text-2xl font-semibold">TanStack Start on Noite</h1>
      <p className="text-sm opacity-70">
        Edit <code>src/routes/index.tsx</code>, then <code>git push</code> to
        deploy.
      </p>

      <dl className="rounded-lg border p-4 text-sm">
        <dt className="font-medium">Rendered on the server at</dt>
        <dd>{data.renderedAt}</dd>
        <dt className="mt-2 font-medium">Runtime</dt>
        <dd className="break-all">{data.runtime}</dd>
      </dl>

      <button
        className="w-fit rounded-md bg-gray-900 px-3 py-2 text-white dark:bg-white dark:text-gray-900"
        onClick={() => setCount((value) => value + 1)}
        type="button"
      >
        Clicked {count} {count === 1 ? "time" : "times"}
      </button>
    </main>
  );
}
