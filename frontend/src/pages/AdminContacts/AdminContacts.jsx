import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { contactAdmin, deleteContact } from "../../api/authApi";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await contactAdmin();
        console.log(`response`, response);

        // SAFE → Modern axios validation
        if (response.status !== 200) {
          throw new Error(response.data?.error || "Unable to fetch contacts.");
        }
        const data = response.data;
        setContacts(data.message || []);
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

    fetchContacts();
  }, []);

  const deleteContactById = async (id) => {
    if (!id) {
      toast.error("Invalid user ID.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteContact(id);
      console.log(`response`, response);

      toast.success(response.data?.message || "User deleted successfully.");

      setContacts((prev) => prev.filter((u) => u._id !== id));
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
      <h2 className="text-2xl font-bold mb-6">All Contact Messages</h2>
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
                  Message
                </th>
                <th className="px-6 py-3 border-b font-semibold text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    No contact messages found.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td className="px-6 py-4 border-b">{contact._id}</td>
                    <td className="px-6 py-4 border-b">{contact.name}</td>
                    <td className="px-6 py-4 border-b">{contact.email}</td>
                    <td className="px-6 py-4 border-b max-w-xs break-words">
                      {contact.message}
                    </td>
                    {/* <td className="px-6 py-4 border-b">
                      {contact.createdAt
                        ? new Date(contact.createdAt).toLocaleString()
                        : ""}
                    </td> */}
                    <td className="px-6 py-4 border-b">
                      <button
                        className="bg-red-500 p-2 rounded-md text-md font-semibold"
                        onClick={() => deleteContactById(contact._id)}
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

export default AdminContacts;
