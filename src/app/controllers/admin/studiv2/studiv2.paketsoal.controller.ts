import { Request, Response } from 'express';
import studiv2PaketsoalService from '../../../services/studiv2/admin.studiv2.paketsoal.service';
interface IResponse {
    success: boolean,
    data: Promise<Response> | any[],
    message: null | string
}
class Studiv2PaketsoalController {
    aspekGetAll = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.aspekGetAll();
            // setTimeout(()=>{},5000)

            // ! DONT DELETE : EXAMPLE DELAY TESTING
            // const fn_delay_response = (arg:any)=>{
            //     console.log(`arg was => ${arg}`);
            //     // return res.status(500).send({ message: "error.message" });
            //     return res.send({
            //         data: datas,
            //         message: "Success"
            //     });
            //   }

            //   setTimeout(fn_delay_response, 3000, 'argumen example');
            // ! DONT DELETE : EXAMPLE DELAY TESTING

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new Studiv2PaketsoalController();