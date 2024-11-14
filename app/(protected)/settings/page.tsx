import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant={"destructive"} type="submit">
          Sign out
        </Button>
      </form>
    </>
  );
}
