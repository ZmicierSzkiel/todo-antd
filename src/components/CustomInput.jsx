import React, { useState } from "react"

import { Input, Button, notification } from "antd"

function CustomInput({ addTask }) {
  //states

  const [text, setText] = useState("")

  //functions

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Congratulations!",
      description: "Your task was successfully added.",
    })
  }

  const handleClick = () => {
    if (text) {
      addTask(text)
      openNotificationWithIcon("success")
    }
    setText("")
  }

  return (
    <div className="d-flex justify-center align-center">
      <Input
        placeholder="Create your task..."
        allowClear
        size="large"
        style={{ width: 300 }}
        onChange={(e) => setText(e.target.value)}
        value={text}
        onPressEnter={() => handleClick()}
      />
      <Button
        type="primary"
        size="large"
        style={{ backgroundColor: "#1581e5" }}
        onClick={() => handleClick()}
      >
        Submit
      </Button>
    </div>
  )
}

export default CustomInput
