import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notifications from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notifications>;
}
