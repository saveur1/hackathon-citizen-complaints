import React, { useState } from 'react';
import { Complaint } from '@/types/complaint';
import { FaTimes } from 'react-icons/fa';

interface ComplaintModalProps {
    isOpen: boolean;
    onClose: () => void;
    complaint: Complaint;
    onUpdateStatus: (status: Complaint['status']) => void;
    onAddResponse: (response: string) => void;
}

const ComplaintModal: React.FC<ComplaintModalProps> = ({
    isOpen,
    onClose,
    complaint,
    onUpdateStatus,
    onAddResponse,
}) => {
    const [selectedStatus, setSelectedStatus] = useState<Complaint['status']>(complaint.status);
    const [response, setResponse] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedStatus !== complaint.status) {
            onUpdateStatus(selectedStatus);
        }
        if (response.trim()) {
            onAddResponse(response);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Update Complaint</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <FaTimes className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-6">
                        {/* Status Update */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Update Status
                            </label>
                            <select
                                id="status"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value as Complaint['status'])}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            >
                                <option value="SUBMITTED">Submitted</option>
                                <option value="UNDER_REVIEW">Under Review</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="RESOLVED">Resolved</option>
                                <option value="REJECTED">Rejected</option>
                                <option value="ESCALATED">Escalated</option>
                            </select>
                        </div>

                        {/* Response */}
                        <div>
                            <label htmlFor="response" className="block text-sm font-medium text-gray-700">
                                Add Response
                            </label>
                            <textarea
                                id="response"
                                rows={4}
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                placeholder="Enter your response to the complaint..."
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ComplaintModal; 