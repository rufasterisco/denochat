export default function Home() {
  const items = ["one", "two", "three"];
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <h1 class="text-4xl font-bold">We can finally chat</h1>
      <ul>
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <input type="text"></input>
    </div>
  );
}
