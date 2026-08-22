import BusinessCard from "@/components/BusinessCard";

export default function Home() {
  return (
    <main className="card-page">
      <BusinessCard side="front" />
      <BusinessCard side="back" />
    </main>
  );
}