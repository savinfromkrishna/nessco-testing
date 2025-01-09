import { Metadata } from "next";
import RevalidationTable from "../revalidation-table";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: "Admin Dashboard - Revalidation",
  description: "Manage cache revalidation for our application",
};

export default async function AdminDashboard() {
  const cookieStore = cookies()
  const adminSession = cookieStore.get('admin_session')

  if (!adminSession || adminSession.value !== 'true') {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              Admin Dashboard - Revalidation
            </span>
          </h1>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </form>
        </div>
        <RevalidationTable />
      </div>
    </div>
  );
}

