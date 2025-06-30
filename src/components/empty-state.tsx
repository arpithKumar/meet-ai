import { cn } from "@/lib/utils";
import Image from "next/image";

interface EmptyStateProps {
  title: string;
  description: string;
  image?: string;
  isAgentScreen?: boolean;
}

const EmptyState = ({
  title,
  description,
  image = "/empty.svg",
  isAgentScreen = false,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        isAgentScreen && "h-screen"
      )}
    >
      <Image src={image} alt="Empty" width={240} height={240} />
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
