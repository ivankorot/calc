import { Request, Response } from "express";
import CalcService from "../services/calc.service";

class CriteriaController {
    private readonly calcService: CalcService;

    public calc = async (request: Request, response: Response) => {
        try {
            const actions = request.body.actions;
            const calcService = new CalcService(actions)
            const res = calcService.calculate()
            response.json(res);
        } catch (err) {
            console.log(err);
        }
    };
}

export default new CriteriaController();
