import { useEffect, useState } from "preact/hooks";

function HiddenInputsComponent() {
  const [name, setName] = useState("Anonymous");

  useEffect(() => {
    // Retrieve stored values from localStorage or use defaults
    const storedName = localStorage.getItem("randomName") || "Anonymous";

    // Update component state with the retrieved or default values
    setName(storedName);
  }, []);

  return (
    <div>
      {/* Hidden input for the name */}
      <input type="hidden" name="name" value={name} />
    </div>
  );
}

export default HiddenInputsComponent;
