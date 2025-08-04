'use client';
import React from 'react';
import { useState } from 'react';
// import CustomButton from './CustomButton';
import CustomModal from './CustomModal';

const CreateTodoModal = ({ onClose, onCreate }) => {
    const [form, setForm] = useState({title:'', completed:false});
    const handleTitle=(e)=>{
        setForm((form)=>({...form, title: e.target.value}))
    }
    const handleComplete=(e)=>{
        setForm((form)=>({...form, completed: e.target.checked}))
    }
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          userId:1 // required by JSONPlaceholder
        }),
      }); 


      if (!res.ok) throw new Error("Failed to create todo");

      const newTodo = await res.json();
      
      onCreate(newTodo); // update UI immediately
      onClose();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };


  return (
    <CustomModal  handleSubmit={handleSubmit} form={form} handleTitle={handleTitle} handleComplete={handleComplete} edit={false} onClose={onClose}/>
  )
}

export default CreateTodoModal