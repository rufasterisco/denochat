import NameGenerator from "../islands/NameGenerator.tsx";

export function Header({ qr }: { qr: string })   {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between z-50 text-xl font-bold p-4 text-[#023047] bg-[#219ebc]">
      <NameGenerator></NameGenerator>
      <img src={qr}></img>
      <form method="POST" action="/delete-chat">
        <button
          className="p-2 rounded-full focus:outline-none focus:ring focus:ring-[#fb8500]"
          style={{ backgroundColor: "#bd5cbcc2", color: "#023047" }}
        >
          ❌
        </button>
      </form>
    </div>
  );
}
