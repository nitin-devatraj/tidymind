import React, { useEffect, useState, useCallback } from "react";
import Icon from "./assets/icon.png";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback(function (data) {
    const loadedTasks = [];
    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    setTasks(loadedTasks);
  }, []);

  const [isLoading, error, fetchTasks] = useHttp(transformTasks);

  useEffect(() => {
    fetchTasks({
      url: "https://tidymind-c4afb-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    });
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <div className="header">
        <img src={Icon} height="80" alt="#" />
        <h1>TidyMind - your notes syncronized</h1>
      </div>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
