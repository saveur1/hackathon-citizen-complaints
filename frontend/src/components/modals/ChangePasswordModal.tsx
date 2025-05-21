import { useState } from "react";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

interface ChangePasswordModalProps {
    handleCloseModal: () => void;
}
const ChangePasswordModal = ({ handleCloseModal }: ChangePasswordModalProps) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm ] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
        ...form,
        [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);
        setError(null);

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const credential = EmailAuthProvider.credential(user.email || "", form.currentPassword);

            try {
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, form.newPassword);
                alert("Password updated successfully!");
                handleCloseModal();
            } catch (error) {
                if ((error as { code?: string }).code === "auth/wrong-password") 
                    setError("The current password is incorrect. Please try again.");
                else if ((error as { code?: string }).code === "auth/weak-password")
                    setError("The new password is too weak. Please choose a stronger password.");
                else {
                    console.error("Error updating password:", error);
                    setError("Failed to update password. Please try again.");
                }
                
            } finally {
                setLoading(false);
            }
        } else {
            setError("No user is currently signed in.");
            setLoading(false);
        }
    };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <form onSubmit={ handleSubmit } className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
            <div className="space-y-3">
                <div>
                    <label className="block text-sm text-gray-600">Current Password</label>
                    <input
                    type="password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600">New Password</label>
                    <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600">Confirm Password</label>
                    <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                { error && (
                    <div className="w-full p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
            <button
                onClick={ handleCloseModal }
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
                Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                {loading ? "Loading..." : "Save Changes"}
            </button>
            </div>
        </form>
    </div>
  )
}

export default ChangePasswordModal