import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  size?: "default" | "sm";
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

export function CopyButton({
  text,
  label = "Copy instructions",
  size = "default",
  variant = "default",
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Instructions copied", {
        description: "Paste them into your approved AI assistant.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Please try again.");
    }
  };

  return (
    <Button
      type="button"
      onClick={handleCopy}
      size={size}
      variant={variant}
      className={cn(className)}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </Button>
  );
}
