import { Router } from "express";

import * as requestController from "../controllers/request.controller";
import * as mailController from "../controllers/mailer.controller";

const router = Router();

router.post('/volunteer', requestController.volunteer);
router.post('/visit', requestController.visit);
router.post('/adopt', requestController.adopt);

router.get('/getAll', requestController.getAllRequests);
router.get('/getAllRaw', requestController.getAllRequestsRaw);

router.get('/getActivities', requestController.getActivities);

router.post('/getByID', requestController.getByID);
router.post('/accept', requestController.acceptRequest, mailController.RenderMailThen, requestController.deleteRequest);
router.post('/refuse', mailController.RenderMailThen, requestController.deleteRequest);


module.exports = router;