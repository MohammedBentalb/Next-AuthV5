import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { providersLogin } from "@/actions/socials-login";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

const Social = () => {
  const [isGooglePending, startGoogleTransition] = useTransition();
  const [isGithubPending, startGithubTransition] = useTransition();
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        disabled={isGooglePending}
        onClick={() => {
          startGoogleTransition(
            async () => await providersLogin("google", DEFAULT_LOGIN_REDIRECT)
          );
        }}
      >
        <FcGoogle />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        disabled={isGithubPending}
        onClick={() => {
          startGithubTransition(
            async () => await providersLogin("github", DEFAULT_LOGIN_REDIRECT)
          );
        }}
      >
        <FaGithub />
      </Button>
    </div>
  );
};

export default Social;
