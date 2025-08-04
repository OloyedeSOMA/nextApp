"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CreateTodoModal from './components/CreateTodoModal';
import EditTodoModal from './components/EditTodoModal';

export default function Home() {
  const [todos, setTodos]= useState([]);
  const [search, setSearch] = useState("");
  const [selectedTodo, setSelectedTodo]= useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const fetchTodos = async ()=> {
    const res= await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
    const data = await res.json();
    console.log(data);
    setTodos(data);
  }

  useEffect(()=>{
    fetchTodos();
  }, []);
  const deleteTodo = async (id) => {
    alert("confirm delete");
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter(todo => todo.id !== id)); 
  };

  const handleCreateTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };
    const handleUpdate = (updatedTodo) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };
  const updateCompleted = async (todoId, checked) => {
      const todoToUpdate = todos.find(t => t.id === todoId);
      if (!todoToUpdate) return;

      const updatedTodo = { ...todoToUpdate, completed: checked };

      // Update API
      await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo)
      });

      // Update UI
      setTodos(prev =>
        prev.map(t => t.id === todoId ? updatedTodo : t)
      );
  };
  
  const displayedTodos = search
    ? todos.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      )
    : todos;

    


  return (
    <div className="font-sans relative  items-center justify-items-center min-h-screen">
      <main className="w-full  h-100vh" align="center">
        <div className="w-full h-auto flex justify-center " align="center">
          <input type="text" placeholder="search todo" value={search}
        onChange={(e) => setSearch(e.target.value)} className="w-[50%] h-[40px] p-5 mr-5 rounded-xl  border-2 border-outline:none border-[#6C63FF]"/>
          <select className="bg-[#6C63FF] w-[50px] h-[30px] text-white rounded-sm mr-5 ">
            <option>ALL</option>
            <option>COMPLETED</option>
          </select>

          <div className="bg-[#6C63FF] w-[50px] h-[30px] rounded-sm p-1">
            <Image src="/images/darkIcon.png" alt="add icon" width="20" height="10"/>
          </div>
        </div>
       
        
        
        {displayedTodos.length===0?
        (<div className="flex flex-cols justify-center items-center">
          <Image
            src="/images/empty.png"
            alt="add icon"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto max-w-[150px]" 
          />
          
        </div>): (displayedTodos.map(todo=>(
          
          <div key={todo.id} className="w-[50%] h-auto mt-5 p-3 flex flex-start justify-evenly border-b-2 border-[#6C63FF] items-center justify-self-center" align="center">
            <input type="checkbox" checked={todo.completed} onChange={(e) => updateCompleted(todo.id, e.target.checked)} />
            <h3 className="w-[200px]">{todo.title}</h3>
            {/* this is to get updated data for details page */}
            <Link href={{pathname: `${todo.id}`,query: {id:todo.id, title: todo.title, completed: todo.completed }}}><div className="w-auto p-1 bg-[#6C63FF] rounded-sm text-white cursor-pointer"><VisibilityOutlinedIcon/></div></Link>
            <div className="w-auto p-1 bg-[#6C63FF] rounded-sm text-white cursor-pointer" onClick={() => {
              setSelectedTodo(todo);
              setShowEditModal(true);
            }}><EditOutlinedIcon/></div>
            <div className="w-auto p-1 bg-red-500 rounded-sm text-white cursor-pointer" onClick={()=>deleteTodo(todo.id)}>  <DeleteOutlinedIcon/></div>
          </div>

          
          
          
        )))} 

      </main>
      {showAddModal && (
        <CreateTodoModal
          onClose={() => setShowAddModal(false)}
          onCreate={handleCreateTodo}
        />
      )};
      {showEditModal && (
        <EditTodoModal
          onClose={() => setShowEditModal(false)}
        todo={selectedTodo}
        onSave={handleUpdate}
        />
      )};



      
      <div className="bg-[#6C63FF] cursor-pointer flex text-white absolute bottom-30 right-30 w-[150px] h-auto rounded-sm p-1" onClick={() => setShowAddModal(true)}>
        <span className='mr-1'>Add New Todo</span>    
        <AddIcon/>
      </div>
    </div>

    
  );
}
