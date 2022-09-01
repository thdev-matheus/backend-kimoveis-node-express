import AppDataSource from "../../data-source";

import { User } from "../../entities/user.entity";
import { Property } from "../../entities/property.entity";
import { Schedule } from "../../entities/schedule.entity";

import { AppError } from "../../errors/appError.model";
import { IScheduleRequest } from "../../interfaces/schedules";
import { DateHandling } from "../../utils/dateHandling.model";

export const scheduleCreateService = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const propertyRepository = AppDataSource.getRepository(Property);
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const dateTransformed = DateHandling.dateEncode(date, hour);
  const verifyIsComercialHour = DateHandling.isComercialHour(
    dateTransformed.hourEnc
  );
  const verifyIsWeekDay = DateHandling.isWeekDay(dateTransformed.weekDay);

  if (!verifyIsComercialHour) {
    throw new AppError(
      "It is only possible to register a schedule for business hours",
      400,
      "https://http.cat/400"
    );
  }

  if (!verifyIsWeekDay) {
    throw new AppError(
      "It is only possible to register a schedule for working days",
      400,
      "https://http.cat/400"
    );
  }

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: { schedules: true },
  });

  if (!user) {
    throw new AppError("User not found", 404, "https://http.cat/404");
  }

  const property = await propertyRepository.findOne({
    where: { id: propertyId },
    relations: { schedules: true },
  });

  if (!property) {
    throw new AppError("Property not found", 404, "https://http.cat/404");
  }

  /* A verificação exigida pelos testes está um pouco errada do ponto de vista lógico pois não temos acesso a um id de uma schedule para se tercerteza que ela existe com precisão, só podemos ver a data e hora sendo que podemos encontrar a mesma data e hora em propriedades e usuários diferentes. Logo a lógica correta para verificar se podemos criar uma schedule naquele dia e horário seria verificar se o usuário já tem algo marcado para aquele dia e horário ou se a property já tem alguma schedule marcada pra aquele horário como feita abaixo: 
  
  const schedulePropertyAllreadyExists = property.schedules.find(
    (schedule) =>
      schedule.date === dateTransformed.dateEnc &&
      schedule.hour === dateTransformed.hourEnc
  );

  const scheduleUserAllreadyExists = user.schedules.find(
    (schedule) =>
      schedule.date === dateTransformed.dateEnc &&
      schedule.hour === dateTransformed.hourEnc
  );

  */
  /* 
 const scheduleAllreadyExists = await scheduleRepository.find({
    relations: { property: true },
    where: {
      date: dateTransformed.dateEnc,
      hour: dateTransformed.hourEnc,
    },
  });

 */

  const scheduleAllreadyExists = await scheduleRepository.findOne({
    where: {
      date: String(dateTransformed.dateEnc).split("T")[0],
      hour: dateTransformed.hourEnc,
    },
  });

  if (scheduleAllreadyExists) {
    throw new AppError(
      "This time is already reserved for another schedule",
      400,
      "https://http.cat/400"
    );
  }

  const newSchedule = scheduleRepository.create({
    date: String(dateTransformed.dateEnc).split("T")[0],
    hour: dateTransformed.hourEnc,
    property,
    user,
  });

  await scheduleRepository.save(newSchedule);

  return newSchedule;
};
