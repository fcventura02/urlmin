import { Request, Response } from "express";
import shortid from "shortid";
import { URLModel } from "../database/model/URL";
import { config } from "../config/Contants";

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {
        //Verifica se url existe
        let { originURL } = req.body;
        originURL.includes("https://")
            ? originURL
            : (originURL = "https://" + originURL);
        const url = await URLModel.findOne({ originURL });
        if (url) {
            res.json(url);
            return;
        }
        //Criar hash para URL
        const hash = shortid.generate();
        const shortURL = `${config.API_URL}/${hash}`;
        //Salvar a URL no Banco
        const newURL = await URLModel.create({ originURL, hash, shortURL });
        //Retornar a URL
        res.status(200).json(newURL);
    }
    public async redirect(req: Request, res: Response): Promise<void> {
        //pegar hash da URL
        const { hash } = req.params;
        //Encontrar a URL original pelo hash
        const url = await URLModel.findOne({ hash });
        //Redirecionar para a URL original a partir do que encontramos no BD
        if (url) {
            res.redirect(url.originURL);
            return;
        }
        res.status(400).json({ error: "URL not found" });
    }
    public async listen(_req: Request, res: Response): Promise<void> {
        //Encontrar a URL original pelo hash
        const url = await URLModel.find();
        //Redirecionar para a URL original a partir do que encontramos no BD
        res.status(200).json({ url });
    }
    public async delete(req: Request, res: Response): Promise<void> {
        //pegar hash da URL
        const { hash } = req.params;
        //Encontrar a URL original pelo hash
        const url = await URLModel.findOneAndDelete({ hash });
        //Redirecionar para a URL original a partir do que encontramos no BD
        res.status(200).json({ url });
    }
}
