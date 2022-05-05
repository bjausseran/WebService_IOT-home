
import { Actuator, ActuatorType, Captor, Prisma, PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient();

type Object = {
    object: Actuator | Captor | User;
}

export type Filter = Prisma.UserWhereInput | Prisma.CaptorWhereInput | Prisma.ActuatorWhereInput | undefined

export type CreateData = Prisma.UserCreateInput | Prisma.CaptorCreateInput | Prisma.ActuatorCreateInput | undefined

export type UpdateData = {
    where: {
      id: string,
    },
    data: Filter
  };

export interface IDatabase {
    get : (model : string, filter : Filter) => Object[] | null,
    getById : (model : string, id : string) => Object | null,
    post : (model: string, data : CreateData) => Promise<Actuator | Captor | User>,
    patch : ( model : string, data : UpdateData) => Promise<Actuator | Captor | User>,
    remove : (model : string, id : string) => Promise<Actuator | Captor | User>
}