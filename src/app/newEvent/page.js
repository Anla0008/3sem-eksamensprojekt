import Header from "@/components/(header)/Header";
import MakeNewEvent from "@/components/(newEvent)/MakeNewEvent";

export default function newEvent() {
  // const NewEvent = () => {
  //   const [step, setStep] = useState(1); // denne indeholder vores "steps" på siden. Step 1 = vælg dato og lokation, step 2 = beskrivelse, værker, navn osv.

  return (
    <div>
      <Header variant="black" />
      <h1 className="text-center">Opret Event</h1>
      <MakeNewEvent />
    </div>
  );
}
