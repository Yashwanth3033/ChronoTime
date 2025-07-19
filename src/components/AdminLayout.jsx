import Header from "./Header";
import {Outlet} from "react-router-dom";
import React from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <section className="h-screen grid grid-cols-[300px_1fr] xl:grid-cols-[400px_1fr] grid-rows-[auto_1fr]">
        <Header className={"col-start-1 col-end-3 row-start-1 row-end-2"} />
        <AdminSidebar className="col-start-1 col-end-2 row-start-2 row-end-3" />
        <main className="col-start-2 col-end-3 row-start-2 row-end-3 overflow-y-scroll">
            <Outlet />
        </main>
    </section>
  )
}
