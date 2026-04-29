import { useState } from "react";
import AddQuest from "./AddQuest";
import QuestList from "./QuestList";

function App() {
  const [quests, setQuests] = useState([]);

  function saveAddQuest(title) {
    let auxQuests = [...quests];
    let id = 0;
    if (auxQuests.length) {
      id = auxQuests[auxQuests.length - 1].id;
    }
    id++;

    const createdQuest = {
      id: id,
      title: title,
      status: "aberto",
      createdAt: new Date(Date.now()).toUTCString(),
    };

    auxQuests.push(createdQuest);
    localStorage.setItem("quests", JSON.stringify(auxQuests));
    setQuests(auxQuests);
  }

  function saveConcludedQuest(quest) {
    let auxQuests = [...quests];

    const editedQuest = {
      id: quest.id,
      title: quest.title,
      status: "concluido",
      createdAt: quest.createdAt,
    };

    const findQuestPosition = auxQuests.findIndex(
      (q) => q.id === editedQuest.id
    );

    auxQuests.splice(findQuestPosition, 1, editedQuest);

    localStorage.setItem("quests", JSON.stringify(auxQuests));
    setQuests(auxQuests);
  }

  function saveEditQuest(quest, title) {
    let auxQuests = [...quests];

    const editedQuest = {
      id: quest.id,
      title: title,
      status: quest.status,
      createdAt: quest.createdAt,
    };

    const findQuestPosition = auxQuests.findIndex(
      (q) => q.id === editedQuest.id
    );

    auxQuests.splice(findQuestPosition, 1, editedQuest);

    localStorage.setItem("quests", JSON.stringify(auxQuests));
    setQuests(auxQuests);
  }

  function deleteQuest(id) {
    const updatedQuests = quests.filter((quest) => quest.id !== id);
    setQuests(updatedQuests);
    localStorage.setItem("quests", JSON.stringify(updatedQuests));
  }

  // Carrega as quests do localStorage quando o app inicia
  if (quests.length === 0 && localStorage.getItem("quests")) {
    setQuests(JSON.parse(localStorage.getItem("quests")));
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card w-[80%] lg:w-[50%] h-[70%] shadow-md rounded-sm transform ease-out duration-300 items-center p-10 gap-5">
        <h1 className="text-5xl font-work font-bold w-fit text-center">
          Quests To Do
        </h1>
        <AddQuest saveAddQuest={saveAddQuest} />
        <QuestList
          quests={quests}
          saveEditQuest={saveEditQuest}
          saveConcludedQuest={saveConcludedQuest}
          deleteQuest={deleteQuest}
        />
      </div>
    </div>
  );
}

export default App;