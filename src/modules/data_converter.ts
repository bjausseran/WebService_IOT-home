import { Captor, SensorType } from "@prisma/client";
import { type } from "os";
import { boolean } from "zod";

export type CaptorR = {
  id: string;
  type: SensorType;
  designation: string;
  rawValue: string;
}
let value;
let result;

export function convert(captor: Captor){
    switch(captor.type){
      case SensorType.TEMPERATURE:
         value = (75 * captor.rawValue_int!)/1023 -20;

          result = {
            id: captor.id,
            type: captor.type,
            designation: captor.designation,
            rawValue: Math.round(value) + " C°"
          }
        return result;
      case SensorType.HUMIDITY:
        value = (100 * captor.rawValue_int!)/1023;
          result = {
            id: captor.id,
            type: captor.type,
            designation: captor.designation,
            rawValue: Math.round(value) + " %"
          }
        return result;
      case SensorType.BARO:
          value = (200 * captor.rawValue_int!)/1023 + 950;
          result = {
            id: captor.id,
            type: captor.type,
            designation: captor.designation,
            rawValue: Math.round(value) + " hPa"
          }
        return result;
      case SensorType.PROXIMITY:
        result = {
          id: captor.id,
          type: captor.type,
          designation: captor.designation,
          rawValue: captor.rawValue_bool ? "Actif" : "Inactif"
        }
          return result;
      default:
        return "Invalide sensor"
    }
  }