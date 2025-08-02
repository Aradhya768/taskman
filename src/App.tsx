import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<{ text: string; done: boolean }[]>([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, done: false }]);
      setTask("");
    }
  };

  const toggleDone = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index: number) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">📝 Task Manager</h3>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
          >
            <Form.Control
              type="text"
              placeholder="Enter a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button variant="primary" className="mt-2 w-100" onClick={addTask}>
              Add Task
            </Button>
          </Form>
          <ListGroup className="mt-4">
            {tasks.map((t, idx) => (
              <ListGroup.Item
                key={idx}
                variant={t.done ? "success" : ""}
                style={{
                  textDecoration: t.done ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => toggleDone(idx)}
              >
                {t.text}
                <Button
                  variant="danger"
                  size="sm"
                  className="float-end"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(idx);
                  }}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
