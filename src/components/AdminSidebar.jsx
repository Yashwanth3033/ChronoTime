import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar({ className }) {
  return (
    <aside className={`${className} min-w-[400px max-w-[550px bg-gray-800 p-4 space-y-3`}>
      <div className="flex items-center justify-cente flex-col gap-y-2">
        <h1 className="text-2xl font-bold uppercase">Actions</h1>
        <hr className="block w-full text-white h-1" />
      </div>

      <div className="flex flex-col gap-y-4">
        <ActionButton toAddr={"admin-dashboard"} actionName={"Browse Product"} />
        <ActionButton toAddr={"add-watch"} actionName={"Add a Product"} />
      </div>
    </aside>
  );
}

const ActionButton = function ({ actionName, toAddr }) {
  return (
    <Link
      to={toAddr}
      className="px-4 py-2 inline-block text-center font-semibold text-lg active:bg-gray-700/30 bg-gray-500/30 text-white rounded-md hover:bg-gray-600/30 ring-2 ring-gray-500 transition-colors duration-300"
    >
      {actionName}
    </Link>
  );
};

/*
const AddProductButton = () => {
  return (
    <button className="">
      Add Product
    </button>
  );
};

*/
