// import React, { useEffect, useState } from "react";
// import { deleteUser, userAdmin } from "../../api/authApi";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const response = await userAdmin();
//         if (response.status !== 200) {
//           throw new Error(response.data?.error || "Unable to fetch users.");
//         }
//         const data = response.data;
//         setUsers(data.users || data.message || []);
//       } catch (err) {
//         toast.error(err.response?.data?.message);
//         setError(
//           err.response?.data?.error ||
//             err.response?.data?.message ||
//             err.response?.data?.extraDetails ||
//             err.message ||
//             "Something went wrong."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//     // Do not call deleteUserById() on mount
//   }, []);

//   const handleEditUser = (id) => {
//     if (!id || typeof id !== "string") {
//       toast.error("Invalid user ID.");
//       return;
//     }
//     navigate(`/admin/users/update/${id}`);
//   };

//   const deleteUserById = async (id) => {
//     if (!id || typeof id !== "string") {
//       toast.error("Invalid user ID.");
//       return;
//     }
//     try {
//       // Pass user ID to deleteUser API correctly
//       const confirmDelete = window.confirm(
//         "Are you sure you want to delete this user?"
//       );
//       if (!confirmDelete) return;

//       const response = await deleteUser(id);
//       toast.success(response.data?.message || "User deleted.");
//       // Remove deleted user from local state
//       setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
//     } catch (error) {
//       // Handle cast to ObjectId error from backend
//       const errorMsg =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         error.message;

//       if (errorMsg && errorMsg.includes("Cast to ObjectId failed")) {
//         toast.error("Failed to delete user: Invalid user ID format.");
//         setError("Failed to delete user: Invalid user ID format.");
//       } else {
//         toast.error(errorMsg || "Could not delete user.");
//         setError(errorMsg || "Could not delete user.");
//       }
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">All Users</h2>
//       {loading && <div className="py-4">Loading...</div>}
//       {error && <div className="py-4 text-red-600">{error}</div>}

//       {!loading && !error && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse bg-white rounded shadow">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 border-b font-semibold text-left">
//                   ID
//                 </th>
//                 <th className="px-6 py-3 border-b font-semibold text-left">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 border-b font-semibold text-left">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 border-b font-semibold text-left">
//                   Role
//                 </th>
//                 <th className="px-6 py-3 border-b font-semibold text-left">
//                   Created At
//                 </th>
//                 <th className="px-6 py-3 border-b font-semibold text-left">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center py-8">
//                     No users found.
//                   </td>
//                 </tr>
//               ) : (
//                 users.map((user) => (
//                   <tr key={user._id}>
//                     <td className="px-6 py-3 border-b">{user._id}</td>
//                     <td className="px-6 py-3 border-b">{user.name}</td>
//                     <td className="px-6 py-3 border-b">{user.email}</td>
//                     <td className="px-6 py-3 border-b">
//                       {user.isAdmin ? (
//                         <span className="text-green-700 font-semibold">
//                           Admin
//                         </span>
//                       ) : (
//                         <span className="text-gray-700">User</span>
//                       )}
//                     </td>
//                     <td className="px-6 py-3 border-b">
//                       {user.createdAt
//                         ? new Date(user.createdAt).toLocaleDateString()
//                         : "--"}
//                     </td>
//                     <td className="px-6 py-3 border-b">
//                       {user.updatedAt
//                         ? new Date(user.updatedAt).toLocaleDateString()
//                         : "--"}
//                     </td>
//                     <td className="flex items-center justify-center px-6 py-3 gap-1 [&>button]:w-[100px] border-b">
//                       <button
//                         type="button"
//                         className="bg-yellow-400 p-2 rounded-md text-md font-semibold "
//                         onClick={() => handleEditUser(user._id)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         type="button"
//                         className="bg-red-500 p-2 rounded-md text-md font-semibold"
//                         onClick={() => deleteUserById(user._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminUsers;

import React, { useEffect, useState } from "react";
import { deleteUser, userAdmin } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await userAdmin();
        console.log(`response`, response);

        // SAFE → Modern axios validation
        if (response.status !== 200) {
          throw new Error(response.data?.error || "Unable to fetch users.");
        }
        const data = response.data;
        setUsers(data.message || []);
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Something went wrong.";

        toast.error(msg);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (id) => {
    if (!id) {
      toast.error("Invalid user ID.");
      return;
    }
    navigate(`/admin/users/update/${id}`);
  };

  const deleteUserById = async (id) => {
    if (!id) {
      toast.error("Invalid user ID.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteUser(id);
      console.log(`response`, response);

      toast.success(response.data?.message || "User deleted successfully.");

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;

      toast.error(errorMsg);
      setError(errorMsg);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Users</h2>
      {loading && <div className="py-4">Loading...</div>}
      {error && <div className="py-4 text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b font-semibold text-left">
                  ID
                </th>
                <th className="px-6 py-3 border-b font-semibold text-left">
                  Name
                </th>
                <th className="px-6 py-3 border-b font-semibold text-left">
                  Email
                </th>
                <th className="px-6 py-3 border-b font-semibold text-left">
                  Role
                </th>
                <th className="px-6 py-3 border-b font-semibold text-left">
                  Created At
                </th>
                <th className="px-6 py-3 border-b font-semibold text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-3 border-b">{user._id}</td>
                    <td className="px-6 py-3 border-b">{user.name}</td>
                    <td className="px-6 py-3 border-b">{user.email}</td>
                    <td className="px-6 py-3 border-b">
                      {user.isAdmin ? (
                        <span className="text-green-700 font-semibold">
                          Admin
                        </span>
                      ) : (
                        <span className="text-gray-700">User</span>
                      )}
                    </td>
                    <td className="px-6 py-3 border-b">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "--"}
                    </td>

                    {/* ACTIONS */}
                    <td className="flex items-center justify-center px-6 py-3 gap-1 [&>button]:w-[100px] border-b">
                      <button
                        className="bg-yellow-400 p-2 rounded-md text-md font-semibold"
                        onClick={() => handleEditUser(user._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 p-2 rounded-md text-md font-semibold"
                        onClick={() => deleteUserById(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
