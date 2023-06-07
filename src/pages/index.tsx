import Meta from "@/components/Shared/Meta";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push("/login");
  }, []);
  return (
    <>
      <Meta
        title="Survival Nexus - Login"
        description="Vital lifeline for the survival of humanity"
        image="/preview.png"
      />
    </>
  );
}
