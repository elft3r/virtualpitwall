import { DataDisplay } from "../core/ui/data-display";
import {
  convertWeatherType,
  formatSpeed,
  formatTemp,
  formatTime,
} from "../utils/formatter/UnitConversion";
import {
  selectCurrentSessionConditions,
  selectCurrentSessionTiming,
  useSelector,
} from "@/lib/redux";

export const Conditions = () => {
  const conditions = useSelector(selectCurrentSessionConditions);
  const timing = useSelector(selectCurrentSessionTiming);
  const useImperialUnits = false;

  return (
    <>
      {!conditions && <p>waiting for data</p>}
      {conditions && (
        <div className="flex flex-wrap gap-4 p-3">
          <DataDisplay
            title="Sim Time"
            content={formatTime(timing?.simTimeOfDay)}
          />
          <DataDisplay
            title="Track Temp"
            content={formatTemp(
              conditions.trackTemp.toString(),
              useImperialUnits,
            )}
          />
          <DataDisplay
            title="Air Temp"
            content={formatTemp(conditions?.airTemp, useImperialUnits)}
          />
          <DataDisplay
            title="Wind"
            content={
              conditions?.windDirection +
              " " +
              formatSpeed(conditions?.windSpeed, useImperialUnits)
            }
          />
          <DataDisplay
            title="Weather Type"
            content={convertWeatherType(conditions.weatherType)}
          />
          <DataDisplay title="Skies" content={conditions.skies.toString()} />
          <DataDisplay
            title="Relative Humidity"
            content={(conditions?.relativeHumidity * 100).toFixed(0) + "%"}
          />
        </div>
      )}
    </>
  );
};