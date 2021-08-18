export interface Weather {
  "@context": Array<ContextClass | string>;
  id:         string;
  type:       string;
  geometry:   Geometry;
  properties: Properties;
}

interface ContextClass {
  "@version": string;
  wmoUnit:    string;
  nwsUnit:    string;
}

interface Geometry {
  type:        string;
  coordinates: Array<Array<number[]>>;
}

interface Properties {
  "@id":                            string;
  "@type":                          string;
  updateTime:                       Date;
  validTimes:                       string;
  elevation:                        Elevation;
  forecastOffice:                   string;
  gridId:                           string;
  gridX:                            string;
  gridY:                            string;
  temperature:                      ApparentTemperature;
  dewpoint:                         ApparentTemperature;
  maxTemperature:                   ApparentTemperature;
  minTemperature:                   ApparentTemperature;
  relativeHumidity:                 ApparentTemperature;
  apparentTemperature:              ApparentTemperature;
  heatIndex:                        ApparentTemperature;
  windChill:                        ApparentTemperature;
  skyCover:                         ApparentTemperature;
  windDirection:                    ApparentTemperature;
  windSpeed:                        ApparentTemperature;
  windGust:                         ApparentTemperature;
  weather:                          AtmosphericDispersionIndex;
  hazards:                          AtmosphericDispersionIndex;
  probabilityOfPrecipitation:       ApparentTemperature;
  quantitativePrecipitation:        ApparentTemperature;
  iceAccumulation:                  ApparentTemperature;
  snowfallAmount:                   ApparentTemperature;
  snowLevel:                        AtmosphericDispersionIndex;
  ceilingHeight:                    ApparentTemperature;
  visibility:                       ApparentTemperature;
  transportWindSpeed:               ApparentTemperature;
  transportWindDirection:           ApparentTemperature;
  mixingHeight:                     ApparentTemperature;
  hainesIndex:                      AtmosphericDispersionIndex;
  lightningActivityLevel:           AtmosphericDispersionIndex;
  twentyFootWindSpeed:              ApparentTemperature;
  twentyFootWindDirection:          ApparentTemperature;
  waveHeight:                       ApparentTemperature;
  wavePeriod:                       ApparentTemperature;
  waveDirection:                    AtmosphericDispersionIndex;
  primarySwellHeight:               AtmosphericDispersionIndex;
  primarySwellDirection:            AtmosphericDispersionIndex;
  secondarySwellHeight:             AtmosphericDispersionIndex;
  secondarySwellDirection:          AtmosphericDispersionIndex;
  wavePeriod2:                      AtmosphericDispersionIndex;
  windWaveHeight:                   AtmosphericDispersionIndex;
  dispersionIndex:                  AtmosphericDispersionIndex;
  pressure:                         AtmosphericDispersionIndex;
  probabilityOfTropicalStormWinds:  AtmosphericDispersionIndex;
  probabilityOfHurricaneWinds:      AtmosphericDispersionIndex;
  potentialOf15mphWinds:            AtmosphericDispersionIndex;
  potentialOf25mphWinds:            AtmosphericDispersionIndex;
  potentialOf35mphWinds:            AtmosphericDispersionIndex;
  potentialOf45mphWinds:            AtmosphericDispersionIndex;
  potentialOf20mphWindGusts:        AtmosphericDispersionIndex;
  potentialOf30mphWindGusts:        AtmosphericDispersionIndex;
  potentialOf40mphWindGusts:        AtmosphericDispersionIndex;
  potentialOf50mphWindGusts:        AtmosphericDispersionIndex;
  potentialOf60mphWindGusts:        AtmosphericDispersionIndex;
  grasslandFireDangerIndex:         AtmosphericDispersionIndex;
  probabilityOfThunder:             AtmosphericDispersionIndex;
  davisStabilityIndex:              AtmosphericDispersionIndex;
  atmosphericDispersionIndex:       AtmosphericDispersionIndex;
  lowVisibilityOccurrenceRiskIndex: AtmosphericDispersionIndex;
  stability:                        AtmosphericDispersionIndex;
  redFlagThreatIndex:               AtmosphericDispersionIndex;
}

interface ApparentTemperature {
  uom:    string;
  values: ApparentTemperatureValue[];
}

interface ApparentTemperatureValue {
  validTime: string;
  value:     number | null;
}

interface AtmosphericDispersionIndex {
  values: AtmosphericDispersionIndexValue[];
}

interface AtmosphericDispersionIndexValue {
  validTime: string;
  value:     ValueValueClass[] | number;
}

interface ValueValueClass {
  phenomenon?:   string;
  significance?: string;
  event_number?: null;
  coverage?:     Coverage | null;
  weather?:      WeatherEnum | null;
  intensity?:    Intensity | null;
  visibility?:   Elevation;
  attributes?:   any[];
}

enum Coverage {
  Chance = "chance",
  Definite = "definite",
  Likely = "likely",
  Patchy = "patchy",
  SlightChance = "slight_chance",
}

enum Intensity {
  Heavy = "heavy",
  Moderate = "moderate",
}

interface Elevation {
  unitCode: UnitCode;
  value:    number | null;
}

enum UnitCode {
  WmoUnitKM = "wmoUnit:km",
  WmoUnitM = "wmoUnit:m",
}

enum WeatherEnum {
  Fog = "fog",
  RainShowers = "rain_showers",
  Thunderstorms = "thunderstorms",
}
