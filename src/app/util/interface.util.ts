import { Action, Stage } from "./type.util"

export interface subjectEmitData {
  action: Action,
  to?: Stage,
  data?: number
}