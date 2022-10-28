import React, { useState } from "react"

import { Col, Input, Row, List, Popconfirm, Checkbox, message } from "antd"
import { EditTwoTone, DeleteTwoTone, SaveTwoTone } from "@ant-design/icons"

function Todo({ item, deleteTask, editTask, changeTaskStatus }) {
  //states

  const [isEdit, setIsEdit] = useState(false)
  const [editText, setEditText] = useState(item.title)

  //functions

  const editMessage = () => {
    message.warning("Your task was successfully edited.")
  }

  const checkboxMessage = () => {
    message.success("You've completed the task, congrats!")
  }

  const editHandler = () => {
    setIsEdit(!isEdit)
    editTask(item.id, editText)
  }

  const submitEditHandler = () => {
    setIsEdit(!isEdit)
    editTask(item.id, editText)
    editMessage()
  }

  const deleteHandler = () => {
    deleteTask(item.id)
  }

  //delete modal popup

  const actions = [
    <Popconfirm
      title="Are you sure to delete this task?"
      onConfirm={() => deleteHandler()}
      okText="Yes"
      cancelText="No"
    >
      <DeleteTwoTone style={{ fontSize: 20, color: "#1581e5" }} />
    </Popconfirm>,
  ]

  //edit switcher

  !isEdit
    ? actions.push(
        <EditTwoTone
          style={{ fontSize: 20, color: "#1581e5" }}
          onClick={() => editHandler()}
        />
      )
    : actions.push(
        <SaveTwoTone
          style={{ fontSize: 20, color: "#1581e5" }}
          onClick={() => submitEditHandler()}
        />
      )

  return (
    <div>
      <List.Item actions={actions}>
        <Row>
          {isEdit ? (
            <Col>
              <Input
                style={{ width: 500 }}
                onChange={(e) => setEditText(e.target.value)}
                value={editText}
              />
            </Col>
          ) : (
            <Col span={24}>
              {item.status ? (
                <Checkbox
                  onChange={() => changeTaskStatus(item.id)}
                  defaultChecked
                >
                  <p style={{ textDecoration: "line-through" }}>{item.title}</p>
                </Checkbox>
              ) : (
                <Checkbox onChange={() => changeTaskStatus(item.id)}>
                  <p onClick={() => checkboxMessage()}>{item.title}</p>
                </Checkbox>
              )}
            </Col>
          )}
        </Row>
      </List.Item>
    </div>
  )
}

export default Todo
