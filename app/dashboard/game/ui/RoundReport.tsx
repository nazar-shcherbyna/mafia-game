import { useGameStore } from "@/app/store"
import { UiButton } from "@/app/ui/atoms/button"

export const RoundReport = () => {
  const [isNight] = useGameStore((state) => [state.isNight])
  const [roundReport, setRoundReport] = useGameStore((state) => [state.roundReport, state.setRoundReport])

  const valueString = (value: any) => {
    if (Array.isArray(value)) return value.join(', ');
    return value;
  }

  return (
    <div>
      <div>Report after the last {isNight ? 'Day': 'Night'}:</div>

      <div>
        {roundReport.map((report, index) => <div className="mt-3" key={index}>
          {Object.entries(report).map((([key, value], index) => <div key={index}>{key}: {valueString(value)}</div>))}
        </div>)}
      </div>

      <UiButton className="mt-3" onClick={() => setRoundReport([])}>Close Report</UiButton>
    </div>
  )
}
