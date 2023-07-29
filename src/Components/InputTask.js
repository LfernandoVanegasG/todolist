import { useState } from "react";
import { Select, Input, Button, Grid, Header, Icon } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

const option = [
  { key: "deporte", text: "Deporte", value: "deporte" },
  { key: "oficina", text: "Oficina", value: "oficina" },
  { key: "casa", text: "Casa", value: "casa" },
  { key: "universidad", text: "Universidad", value: "universidad" },
  { key: "biblioteca", text: "Biblioteca", value: "biblioteca" },
  { key: "mall", text: "Mall", value: "mall" },
  { key: "otra", text: "Otra", value: "otra" },
];

export default function InputTask(props) {
  const [task, setTask] = useState({
    idTask: "",
    taskName: "",
    categoryTask: ""
  });

  const [error, setError] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);

  const { createTask } = props;

  const onChangeTask = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const onChangeCategoryTask = (e, data) => {
    setTask({
      ...task,
      [data.name]: data.value
    });
  };

  const onSudmitTask = (e) => {
    e.preventDefault();

    // Validación
    if (task.taskName.trim() === "") {
      setError(true);
      return;
    }
    if (task.categoryTask === "") {
      setErrorCategory(true);
      return;
    }

    // Asignar un Id aleatorio
    task.idTask = uuidv4();

    // Crear la tarea
    createTask(task);

    // Limpiar los input
    setTask({
      idTask: "",
      taskName: "",
      categoryTask: ""
    });

    // Eliminar mensajes previos de error
    setError(false);
    setErrorCategory(false);
  };

  return (
    <>
      <Grid centered columns={2}>
        <Input
          size="small"
          icon="add"
          placeholder="Escribe tu tarea..."
          iconPosition="left"
          name="taskName"
          value={task.taskName}
          onChange={onChangeTask}
        />
        <Select
          compact
          options={option}
          className="select-form-task"
          name="categoryTask"
          placeholder="Categoria"
          value={task.categoryTask}
          onChange={onChangeCategoryTask}
        />
        <Button type="submit" color="violet" onClick={onSudmitTask}>
          añadir tarea
        </Button>
      </Grid>
      {error && (
        <Grid centered>
          <Header as="h4" color="red" className="alert-error-form">
            <Icon name="close" />
            <Header.Content>La tarea es obligatoria</Header.Content>
            <Icon name="close" />
          </Header>
        </Grid>
      )}
      {errorCategory && (
        <Grid centered>
          <Header as="h4" color="red" className="alert-error-form">
            <Icon name="close" />
            <Header.Content>La Categoria es obligatoria</Header.Content>
            <Icon name="close" />
          </Header>
        </Grid>
      )}
    </>
  );
}
