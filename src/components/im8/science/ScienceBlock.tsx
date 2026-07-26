import { DoctorsGrid } from "@/components/im8/science/DoctorsGrid";
import { NadDeclineChart } from "@/components/im8/science/NadDeclineChart";
import { MitochondriaDiagram } from "@/components/im8/science/MitochondriaDiagram";

export function ScienceBlock() {
  return (
    <>
      <DoctorsGrid />
      <NadDeclineChart />
      <MitochondriaDiagram />
    </>
  );
}
