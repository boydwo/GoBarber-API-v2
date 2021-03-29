import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppoitmentsRepository';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const hourStart = 8;
    // constroi um array com as horas do dia
    const eachDayArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachDayArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      return { hour, available: !hasAppointmentInHour };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
