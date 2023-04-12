import { Request, Response } from 'express';
import redisPaketsoalService
    from '../../../../services/studiv2/redis/redis.studiv2.paketsoal.service';


class redisStudiv2PaketsoalController {

    index = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisPaketsoalService = new redisPaketsoalService(req);
            const datas = await service.testing();
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

export default new redisStudiv2PaketsoalController();