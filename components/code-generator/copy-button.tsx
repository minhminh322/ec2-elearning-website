import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy, CheckCircle } from "lucide-react";
import { useToast } from "../ui/use-toast";

export default function CodeCopyButton({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const notify = () => {
    setCopied(true);
    toast({
      //   title: "Scheduled: Catch up",
      description: (
        <div className="flex items-center space-x-2">
          <CheckCircle className="m-1 text-green-500 w-10 h-10" />
          <p className="text-lg">Copied to clipboard !</p>
        </div>
      ),
      duration: 3000,
    });
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <button className="absolute flex flex-row items-center top-0 right-2 p-2">
      <span className="m-1 pb-1 basis-3/4 text-sm">{language}</span>
      <CopyToClipboard text={code} onCopy={(copied) => notify()}>
        {copied ? (
          <CheckCircle className="m-1 text-green-500 w-10 h-10" />
        ) : (
          <Copy className="m-1 w-10 h-10 transform transition duration-500 ease-in-out hover:scale-110" />
        )}
      </CopyToClipboard>
    </button>
  );
}
