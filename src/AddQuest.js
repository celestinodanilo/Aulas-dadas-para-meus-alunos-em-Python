import { useState } from "react";

export default function AddQuest(props) {
  const [title, setTitle] = useState("");

  function handleAddQuest() {
    if (title.trim() !== "") {
      props.saveAddQuest(title);
      setTitle("");
    }
  }

  return (
    <div className="flex gap-4 w-full justify-center my-4">
      <input
        type="text"
        placeholder="Digite uma nova quest..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-full bg-secondary pl-4 w-full input-sm flex focus:outline-none"
        onKeyDown={(e) => e.key === "Enter" && handleAddQuest()}
      />
      <button
        onClick={handleAddQuest}
        className="btn btn-primary rounded-full px-6"
      >
        Adicionar
      </button>
    </div>
  );
}