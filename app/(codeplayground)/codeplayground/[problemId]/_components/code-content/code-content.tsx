import { MarkdownNote } from "@/components/markdown-note";
import { CodeContentProps } from "../code-playground";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export const CodeContent = ({
    problemId,
    content,
    sc,
    solution,
}: CodeContentProps) => {

    const menu = [
        {
            title: "Problem Statement",
            component: <MarkdownNote value={content} />
        },
        {
            title: "Solution",
            component: <h1>This is the Solution content</h1>
        },
        {
            title: "Submission",
            component: <h1>This is the Submission content</h1>
        }
    ]
    return (
        <div className="relative h-full flex flex-col overflow-hidden items-center justify-center rounded-lg border">
            <Tabs defaultValue={menu[0].title} className="flex flex-col w-full h-full">
                <TabsList className="w-full justify-start sticky top-0">
                    {menu.map(({ title }, index) => {
                        return (
                            <TabsTrigger key={index} value={title}>
                                {title}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
                <div className="flex-grow overflow-y-auto">
                    {menu.map(({ title, component }, index) => {
                        return (
                            <TabsContent key={index} value={title}>
                                {component}
                            </TabsContent>
                        );
                    })}
                </div>

            </Tabs>

        </div>
    );
};