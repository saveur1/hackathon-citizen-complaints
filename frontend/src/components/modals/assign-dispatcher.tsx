import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { UserShape } from "@/types";

  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  interface Props {
      children?: React.ReactNode,
      reportedBy?: UserShape | null
  }
  
  export function AssignDispatcherModal({ children, reportedBy }: Props) {
      return (
          <Dialog>
              <DialogTrigger asChild>
                  {children}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white rounded-xl">
              <DialogHeader>
                  <DialogTitle>Assign Dispatcher</DialogTitle>
                  <DialogDescription>
                  Review the reporter's information below. Confirm their details before proceeding with the dispatcher assignment.
                  </DialogDescription>
              </DialogHeader>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
              </DialogContent>
          </Dialog>
      )
  }
  