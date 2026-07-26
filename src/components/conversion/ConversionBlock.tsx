import { ComparisonsTable } from "./ComparisonsTable"
import { FaqAccordion } from "./FaqAccordion"
import { RiskFreeCta } from "./RiskFreeCta"
import { SimpleByDesignCards } from "./SimpleByDesignCards"

export function ConversionBlock() {
  return (
    <>
      <ComparisonsTable />
      <SimpleByDesignCards />
      <RiskFreeCta />
      <FaqAccordion />
    </>
  )
}
