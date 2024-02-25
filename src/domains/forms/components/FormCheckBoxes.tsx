"use client"

import { Checkbox } from "@/components/ui/checkbox"

function FormCheckBoxes() {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <Checkbox id="terms1" />
      <Checkbox id="terms1" />
      <Checkbox id="terms1" />
      <Checkbox id="terms1" />
    </div>
  )
}

export { FormCheckBoxes };