// import React, { useEffect, useState } from "react";
// import { updateUser } from "../../api/authApi";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { userAdmin } from "../../api/authApi";

// const AdminUserUpdate = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     isAdmin: false,
//   });
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         // Ideally we'd have an endpoint for a single user, but fallback to all users.
//         const res = await userAdmin();
//         const users = res.data?.users || [];
//         const found = users.find((u) => u._id === id);
//         if (!found) {
//           setError("User not found.");
//         } else {
//           setUser({
//             name: found.name || "",
//             email: found.email || "",
//             isAdmin: !!found.isAdmin,
//           });
//         }
//       } catch (err) {
//         setError(
//           err.response?.data?.message || err.message || "Could not fetch user."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchUser();
//     else setLoading(false);
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setUser((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError("");
//     try {
//       const response = await updateUser(id, user);
//       setUser(response.data.user);
//       toast.success("User updated successfully!");
//       navigate("/admin/users");
//     } catch (err) {
//       setError(
//         err.response?.data?.message || err.message || "Could not update user."
//       );
//       toast.error(
//         err.response?.data?.message || err.message || "Could not update user."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="py-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="py-8 text-red-600">{error}</div>;
//   }

//   return (
//     <div className="max-w-md mx-auto p-8 bg-white rounded shadow flex flex-col gap-4">
//       <h2 className="text-xl font-bold mb-4">Update User</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <div>
//           <label className="block mb-1 font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="isAdmin"
//             checked={user.isAdmin}
//             onChange={handleChange}
//             id="isAdmin"
//           />
//           <label htmlFor="isAdmin" className="font-medium">
//             Is Admin
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-60"
//           disabled={submitting}
//         >
//           {submitting ? "Updating..." : "Update User"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminUserUpdate;

import React, { useEffect, useState } from "react";
import { updateUser, userAdmin } from "../../api/authApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminUserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // -------------------------------
  // FETCH USER DATA
  // -------------------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await userAdmin();

        if (res.status !== 200) {
          throw new Error("Could not fetch users.");
        }

        const users = res.data?.message || [];
        const found = users.find((u) => u._id === id);

        if (!found) {
          toast.error("User not found.");
          setError("User not found.");
          return;
        }

        setUser({
          name: found.name || "",
          email: found.email || "",
          isAdmin: Boolean(found.isAdmin),
        });
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Could not fetch user."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
    else setLoading(false);
  }, [id]);

  // -------------------------------
  // HANDLE CHANGE
  // -------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // -------------------------------
  // HANDLE UPDATE SUBMIT
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await updateUser(id, user);
      console.log(`res`, res);
      toast.success("User updated successfully!");

      // Set updated user correctly
      if (res.data?.user) {
        setUser(res.data.user);
      }

      navigate("/admin/users");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Could not update user.";

      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // -------------------------------
  // RENDER
  // -------------------------------

  if (loading) return <div className="py-8">Loading...</div>;

  if (error) return <div className="py-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded shadow flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">Update User</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAdmin"
            checked={user.isAdmin}
            onChange={handleChange}
            id="isAdmin"
          />
          <label htmlFor="isAdmin" className="font-medium">
            Is Admin
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default AdminUserUpdate;
