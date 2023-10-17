import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Authentication from "../authentication/authentication";
import { ReactElement } from "react";

interface AuthDialogProps {
  triggerButton: ReactElement;
}
export const AuthDialog = ({ triggerButton }: AuthDialogProps) => {
  //   console.log(triggerButton.props.children);
  const buttonType = triggerButton.props.children;
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {buttonType === "Sign in" ? <Authentication /> : null}
      </DialogContent>
    </Dialog>
  );
};
