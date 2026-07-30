import { DoctorIcon, FlaskIcon, ShieldIcon, TruckIcon } from "../icons";

const TRUST_ITEMS = [
  { icon: DoctorIcon, label: "Developed\nwith doctors" },
  { icon: FlaskIcon, label: "Third-party\ntested" },
  { icon: TruckIcon, label: "Free\nshipping" },
  { icon: ShieldIcon, label: "60-day\nguarantee" },
];

export function TrustRow() {
  return (
    <div className="mt-4.5 flex justify-between gap-2 py-1.5">
      {TRUST_ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-1 flex-col items-center gap-1.5 text-center">
          <Icon className="text-[#CA133D]" />
          <span className="text-[10px] leading-[1.25] font-medium whitespace-pre-line text-[#3a3a33]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
