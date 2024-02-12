import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { monacoThemes } from "@/lib/defineTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const themeList = {
    active4d: "Active4D",
    "all-hallows-eve": "All Hallows Eve",
    amy: "Amy",
    blackboard: "Blackboard",
    "brilliance-black": "Brilliance Black",
    "brilliance-dull": "Brilliance Dull",
    "chrome-devtools": "Chrome DevTools",
    "clouds-midnight": "Clouds Midnight",
    clouds: "Clouds",
    cobalt: "Cobalt",
    cobalt2: "Cobalt2",
    dawn: "Dawn",
    dracula: "Dracula",
    dreamweaver: "Dreamweaver",
    eiffel: "Eiffel",
    "espresso-libre": "Espresso Libre",
    github: "GitHub",
    idle: "IDLE",
    katzenmilch: "Katzenmilch",
    "kuroir-theme": "Kuroir Theme",
    lazy: "LAZY",
    "magicwb--amiga-": "MagicWB (Amiga)",
    "merbivore-soft": "Merbivore Soft",
    merbivore: "Merbivore",
    "monokai-bright": "Monokai Bright",
    monokai: "Monokai",
    "night-owl": "Night Owl",
    nord: "Nord",
    "oceanic-next": "Oceanic Next",
    "slush-and-poppies": "Slush and Poppies",
    "tomorrow-night-blue": "Tomorrow-Night-Blue",
    "tomorrow-night-bright": "Tomorrow-Night-Bright",
    "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
    "tomorrow-night": "Tomorrow-Night",
    tomorrow: "Tomorrow",
    twilight: "Twilight",
    "upstream-sunburst": "Upstream Sunburst",
    "vibrant-ink": "Vibrant Ink",
    "xcode-default": "Xcode_default",
    zenburnesque: "Zenburnesque",
    iplastic: "iPlastic",
    idlefingers: "idleFingers",
    krtheme: "krTheme",
    monoindustrial: "monoindustrial",
    "solarized-light": "Solarized-light",
    "solarized-dark": "Solarized-dark",
    "github-dark": "GitHub Dark",
    "github-light": "GitHub Light",
    "textmate--mac-classic-": "Textmate (Mac Classic)",

};
export function ThemeDropdown({
    theme,
    handleThemeChange,
}: {
    theme: string;
    handleThemeChange: any;
}) {
    return (
        <Select defaultValue={theme} onValueChange={(value: string) => handleThemeChange(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(themeList).map(([themeId, themeName]) => (
                    <SelectItem key={themeId} value={themeId}>{themeName}</SelectItem>
                ))}
            </SelectContent>
        </Select>

    );
}
