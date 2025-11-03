import { useRouter } from "next/navigation";
import Button from "./Button";

export default function Error({ error, buttonText = "Try again" }) {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-[1.4rem]">{error}</h2>
      {/* Redirect to home page */}
      <Button text={buttonText} onHandleClick={() => router.push("/")} />
    </div>
  );
}
