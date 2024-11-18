import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!!"
      backButtonHref="/auth/error"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon className="size-7 text-destructive" />
      </div>
    </CardWrapper>
  );
}
