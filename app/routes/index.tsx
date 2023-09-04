import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

interface Data {
  results: string[];
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    let results = NAMES;
    results.push("ok");
    return ctx.render({ results });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { results } = data;
  return (
    <div>
      <form>
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((name) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  );
}
