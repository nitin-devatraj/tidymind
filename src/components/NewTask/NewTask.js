import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const [isLoading, error, sendTaskRequests] = useHttp(addTask);

  let text;
  function addTask(data) {
    const generatedId = data.name;
    const createdTask = { id: generatedId, text: text };
    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    text = taskText;
    sendTaskRequests({
      url: "https://tidymind-c4afb-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { text: taskText },
    });
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
