"use client"

import { useState } from "react"
import ChatButton from "./chat-button"
import ChatInterface from "./chat-interface"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatInterface isOpen={isOpen} />
    </>
  )
}

