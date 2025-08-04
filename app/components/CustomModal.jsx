"use client";
import React from 'react';
import CustomButton from './CustomButton';

const CustomModal = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">{props.edit?"Edit Todo":"Create Todo"}</h2>
        <form onSubmit={props.handleSubmit}>
          <input
            type="text"
            placeholder="Todo title"
            value={props.form.title}
            onChange={props.handleTitle}
            className="border w-full p-2 rounded mb-3"
            required
          />
          <label className="flex items-center gap-2 mb-4">
            {props.edit ? (
            //  Edit Mode - active
            <input
                type="checkbox"
                checked={!!props.form.completed}
                onChange={props.handleComplete}
                
            />
            ) : (
            //  Create Mode -  Disabled
            <input
                type="checkbox"
                defaultChecked={false}
                disabled
            />
            )}
            Completed
          </label>
          <div className="flex justify-end gap-2">
            <CustomButton
              type="button"
              onClick={props.onClose}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              className="px-3 py-1 bg-[#6C63FF] rounded-sm text-white cursor-pointer"
              
            >
              save
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomModal