import { Captor, SensorType } from "@prisma/client";

export function convert(captor: Captor){
    switch(captor.type){
      case SensorType.TEMPERATURE:
          captor.rawValue_int = (75 * captor.rawValue_int!)/1023 -20;
          captor.rawValue_bool = null;
        return captor;
      case SensorType.HUMIDITY:
          captor.rawValue_int = (100 * captor.rawValue_int!)/1023;
          captor.rawValue_bool = null;
        return captor;
      case SensorType.BARO:
          captor.rawValue_int = (200 * captor.rawValue_int!)/1023 + 950;
          captor.rawValue_bool = null;
        return captor;
      case SensorType.PROXIMITY:
        captor.rawValue_int = null;
          return captor;
      default:
        return "Invalide sensor"
    }
  }