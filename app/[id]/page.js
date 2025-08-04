"use client";
import React from 'react'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CustomButton from '../components/CustomButton';

const TodoDetail = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
  const title = searchParams.get("title");
  const completed = searchParams.get("completed") === "true";
    
//     const [todo, setTodo] = useState(null);

//     const fetchTodo = async () => {
//         const { id } = await params;
//         const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
//         const data = await res.json();
//         setTodo(data);
//         console.log(data)
//     };

//   useEffect(() => {
//     fetchTodo();
//   }, []);
  if (!id) return <p>Loading...</p>;
  return (
    <div className="p-6 bg-white p-6 rounded-lg w-96   justify-self-center shadow-xl">
        <h1 className="text-2xl font-bold mb-2">Todo Detail</h1>
        <p className="mb-2"><b>Task Name:</b>{title}</p>
        <p className="mb-2"><b>ID:</b> {id}</p>
        <p className="mb-2"><b>Completed:</b> {completed ? "Completed" : "Pending"}</p>
        <p className="mb-2"><b>User ID:</b> 1</p>

        <Link href="/"><CustomButton className="w-auto p-1 bg-[#6C63FF] rounded-sm text-white cursor-pointer">Go Back</CustomButton></Link>
    </div>
  )
}

export default TodoDetail