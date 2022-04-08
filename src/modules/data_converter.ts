import { Captor, SensorType } from "@prisma/client";

export function convert(captor: Captor){
    switch(captor.type){
      case SensorType.TEMPERATURE:
          captor.rawValue_int = (75 * captor.rawValue_int)/1023 -20;
        return captor;
      case SensorType.HUMIDITY:
          captor.rawValue_int = (100 * captor.rawValue_int)/1023;
        return captor;
      case SensorType.BARO:
          captor.rawValue_int = (200 * captor.rawValue_int)/1023 + 950;
        return captor;
      case SensorType.PROXIMITY:
          return captor;
        // if(captor.rawValue_bool){
        //   return true;
        // }
        // else{
        //   return false;
        // }
      default:
        return "Invalide sensor"
    }
  }