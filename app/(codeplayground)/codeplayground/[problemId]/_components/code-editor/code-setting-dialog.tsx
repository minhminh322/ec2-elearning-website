import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { ThemeDropdown } from "./theme-dropdown";
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export const SettingDialog = ({
  theme,
  handleThemeChange,
  fontSize,
  handleFontSizeChange,
}: {
  theme: string;
  handleThemeChange: any;
  fontSize: number;
  handleFontSizeChange: any;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"smallIcon"} title="Setting">
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
          <div className="grid gap-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="themeEditor">Theme</Label>
                <ThemeDropdown
                  theme={theme}
                  handleThemeChange={handleThemeChange}
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="fontSize">Font Size</Label>
                <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                  {fontSize}
                </span>
              </div>
              <Slider
                id="fontSize"
                min={10}
                max={20}
                defaultValue={[fontSize]}
                step={1}
                onValueChange={handleFontSizeChange}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                aria-label="fontSize"
              />
            </div>
          </div>

          <DialogFooter>
            {/* <Button type="submit">Save changes</Button> */}
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
