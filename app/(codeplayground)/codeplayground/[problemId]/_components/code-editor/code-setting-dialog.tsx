import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Settings } from "lucide-react"
import { ThemeDropdown } from "./theme-dropdown"
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

export const SettingDialog = ({ theme, handleThemeChange }: { theme: string, handleThemeChange: any }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"smallIcon"}>
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Setting</span>
                </Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Code Playground Setting</DialogTitle>
                        {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                    </DialogHeader>
                    <div className="">
                        <ThemeDropdown theme={theme} handleThemeChange={handleThemeChange} />
                    </div>
                    <DialogFooter>
                        {/* <Button type="submit">Save changes</Button> */}
                    </DialogFooter>
                </DialogContent>
            </DialogPortal>

        </Dialog>
    );
}