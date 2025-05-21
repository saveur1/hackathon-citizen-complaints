import React, { useState, useEffect } from "react";
import { useAgencies } from '@/Context/agencies-context';
import { useComplaints } from '@/Context/complaints-context';
import { useUser } from '@/Context/user-context';
import { useNavigate } from 'react-router-dom';

const ComplaintForm = () => {
    const navigate = useNavigate();
    const { agencies, error: agenciesError, loading: loadingAgencies } = useAgencies();
    const { submitComplaint, loading: submittingComplaint, error: submitError } = useComplaints();
    const { user } = useUser();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        handledBy: "",
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Check for pending complaint on component mount
    useEffect(() => {
        const pendingComplaint = localStorage.getItem('pendingComplaint');
        if (pendingComplaint && user) {
            // If user is logged in and there's a pending complaint, submit it
            const complaintData = JSON.parse(pendingComplaint);
            handleSubmitComplaint(complaintData);
            localStorage.removeItem('pendingComplaint');
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear success message when form is modified
        setSuccessMessage(null);
    };

    const handleSubmitComplaint = async (data: typeof formData) => {
        try {
            await submitComplaint({
                ...data,
                handledBy: data.handledBy
            });

            // Reset form after successful submission
            setFormData({
                title: "",
                description: "",
                location: "",
                handledBy: "",
            });

            // Show success message
            setSuccessMessage('Your complaint has been submitted successfully!');
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        } catch (err) {
            console.error('Failed to submit complaint:', err);
            throw err;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!user) {
                // If user is not logged in, save to localStorage and redirect to login
                localStorage.setItem('pendingComplaint', JSON.stringify(formData));
                setSuccessMessage('Please log in to submit your complaint. You will be redirected to the login page.');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                return;
            }

            // If user is logged in, submit directly
            await handleSubmitComplaint(formData);
        } catch (err) {
            // Error is handled by the context
            console.error('Failed to submit complaint:', err);
        }
    };

    return (
        <form
            className="mx-auto max-w-xl space-y-6 rounded-xl border bg-transparent p-8 shadow-md"
            onSubmit={handleSubmit}
        >
            {user && (agenciesError || submitError) && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                    {agenciesError || submitError}
                </div>
            )}

            {successMessage && (
                <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600">
                    {successMessage}
                </div>
            )}

            {/* Title */}
            <div>
                <label className="mb-2 block font-semibold text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Pothole on Main Street"
                    className="w-full rounded border border-gray-300 p-3 outline-none"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="mb-2 block font-semibold text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a detailed description of the issue."
                    className="h-32 w-full resize-none rounded border border-gray-300 p-3 outline-none"
                    required
                ></textarea>
            </div>

            {/* Location */}
            <div>
                <label className="mb-2 block font-semibold text-gray-700">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Corner of 5th Ave and Elm St"
                    className="w-full rounded border border-gray-300 p-3 outline-none"
                    required
                />
            </div>

            {/* Category (shown to user) but handledBy internally */}
            <div>
                <label className="mb-2 block font-semibold text-gray-700">Category</label>
                <select
                    name="handledBy"
                    value={formData.handledBy}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 p-3 outline-none"
                    disabled={loadingAgencies}
                    required
                >
                    <option value="">Select a category</option>
                    {Array.isArray(agencies) && agencies.map(agency => (
                        <option key={agency._id} value={agency._id}>
                            {agency.name}
                        </option>
                    ))}
                </select>
                {loadingAgencies && (
                    <p className="mt-1 text-sm text-gray-500">Loading categories...</p>
                )}
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="w-full rounded bg-gray-800 py-3 font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-400"
                    disabled={submittingComplaint}
                >
                    {submittingComplaint ? 'Submitting...' : 'Submit Complaint'}
                </button>
            </div>
        </form>
    );
};

export default ComplaintForm;
