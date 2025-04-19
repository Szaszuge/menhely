import { Router } from "express";

import * as requestController from "../controllers/request.controller";

const router = Router();

router.get('/getAll', requestController.getAllRequests);
router.get('/getAllRaw', requestController.getAllRequestsRaw);
router.post('/accept', requestController.acceptRequest);
router.post('/refuse', requestController.refuseRequest);

module.exports = router;