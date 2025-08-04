"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import CustomModal from './CustomModal';
const EditTodoModal = ({onClose, todo, onSave}) => {
    const [form, setForm] = useState({ title: "", completed: false, });

    useEffect(() => {
        if (todo) {
        setForm(todo);
        }
    }, [todo]);

    const handleTitle=(e)=>{
        setForm((form)=>({...form, title: e.target.value}))
    }
    const handleComplete=(e)=>{
        setForm((form)=>({...form, completed: e.target.checked}))
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
    const updatedTodo = { ...form };

    await fetch(`https://jsonplaceholder.typicode.com/todos/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo)
    });

    onSave(updatedTodo);
    onClose();
  };
  return (
    <CustomModal  handleSubmit={handleUpdate} form={form} handleTitle={handleTitle} handleComplete={handleComplete} edit={true} onClose={onClose}/>
  )
}

export default EditTodoModal