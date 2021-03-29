import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProviderController from '../controllers/ProviderController';

const providersRouter = Router();
const providerController = new ProviderController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);

export default providersRouter;
