import * as express from "express";
import {find, getRatings, rate} from "../controllers/ProfessorCtrl";

const router = express.Router();

router.get("/", find);
router.get("/rating", getRatings);
router.post("/rate", rate);

export default router;