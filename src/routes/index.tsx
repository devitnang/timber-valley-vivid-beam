import { createFileRoute } from "@tanstack/react-router";
import CapricornCountdown from "@/components/CapricornCountdown";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <CapricornCountdown />;
}
