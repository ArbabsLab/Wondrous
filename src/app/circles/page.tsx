import { getUserCircles } from "@/actions/circleActions";
import CreateCircleButton from "@/components/CreateCircle";
import UserCircles from "@/components/UserCircles";
import WhoToJoin from "@/components/WhoToJoin";

export default async function CirclesPage() {
  const circles = await getUserCircles();

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <h1 className="text-3xl font-bold">Circles</h1>

      {/* Create a new circle */}
      <CreateCircleButton />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User's circles with leave buttons */}
        <div className="lg:col-span-2">
          <UserCircles initialCircles={circles} />
        </div>

        {/* Suggested circles to join */}
        <div className="lg:col-span-1">
          <WhoToJoin />
        </div>
      </div>
    </div>
  );
}
