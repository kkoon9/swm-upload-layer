import { Router } from 'express';
import uploadAPI from './upload';

const router = Router();

router.use('/', uploadAPI);

export default router;
