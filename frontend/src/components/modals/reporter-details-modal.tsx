import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserShape } from "@/types"

interface Props {
    children?: React.ReactNode,
    reportedBy?: UserShape | null
}

export function ReporterDetailsModal({ children, reportedBy }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-xl">
            <DialogHeader>
                <DialogTitle>Emergency Reporter Information</DialogTitle>
                <DialogDescription>
                Review the reporter's information below. Confirm their details before proceeding with the dispatcher assignment.
                </DialogDescription>
            </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    {reportedBy?.profileImageUrl && (
                        <img
                            src={reportedBy.profileImageUrl}
                            alt="Dispatcher Profile"
                            className="w-80 h-60 rounded-xl object-cover"
                        />
                    )}
                    <div className="w-80">
                        <p className="font-medium text-lg">
                            <span className="font-semibold">Name: </span>
                            {reportedBy?.fullName || "Unknown Name"}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                            <span className="font-semibold">Role: </span>
                            {reportedBy?.role || "Unknown Role"}
                        </p>
                        <p className="text-sm text-gray-500">
                            <span className="font-semibold">Email: </span>
                            {reportedBy?.email || "Unknown Email"}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
