import React, { useState } from "react"

import { Layout, List, Row, Col } from "antd"

import Todo from "./components/Todo"
import CustomInput from "./components/CustomInput"
import { useEffect } from "react"

const { Header, Footer, Content } = Layout

function App() {
  //states

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) ?? []
  })

  //functions

  const addTask = (text) => {
    const tasksArr = [
      ...tasks,
      { id: tasks.length + 1, title: text, status: false },
    ]
    setTasks(tasksArr)
  }

  const deleteTask = (id) => {
    const deleteHandler = tasks.filter((item) => item.id !== id)
    setTasks(deleteHandler)
  }

  const editTask = (id, text) => {
    const editHandler = tasks.map((item) =>
      item.id === id ? { ...item, title: text } : item
    )
    setTasks(editHandler)
  }

  const changeTaskStatus = (id) => {
    const statusHandler = tasks.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    )
    setTasks(statusHandler)
  }

  //events

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className="App clear">
      <Layout style={{ height: "100vh" }}>
        <Header style={{ backgroundColor: "#1890ff" }}>
          <div className="d-flex justify-around align-center">
            <h1 style={{ color: "#fff" }}>Your today's plans</h1>
            <h3 style={{ color: "#fff" }}>
              {tasks.length === 1
                ? `Only one task left`
                : `${tasks.length} current tasks`}
            </h3>
          </div>
        </Header>
        <Content style={{ margin: 50 }}>
          <CustomInput addTask={addTask} />
          <Row>
            <Col span={12} offset={6}>
              <List
                size="large"
                dataSource={tasks}
                renderItem={(item) => (
                  <Todo
                    item={item}
                    deleteTask={deleteTask}
                    editTask={editTask}
                    changeTaskStatus={changeTaskStatus}
                  />
                )}
              />
            </Col>
          </Row>
        </Content>
        <Footer style={{ backgroundColor: "#1890ff" }}>
          <h3
            className="d-flex align-center justify-center"
            style={{ color: "#fff" }}
          >
            <a
              rel="noreferrer"
              href="https://github.com/ZmicierSzkiel"
              target="_blank"
            >
              Created by Zmicier Szkiel, 2022
            </a>
          </h3>
        </Footer>
      </Layout>
    </div>
  )
}

export default App
