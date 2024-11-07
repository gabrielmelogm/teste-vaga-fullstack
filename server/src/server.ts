import express, { Request, Response } from "express";
import csvToJson from "csvtojson";
import multer from "multer";
import { createReadStream } from "node:fs";
import { Readable, Transform, Writable } from "node:stream";
import { TransformStream } from "node:stream/web";
import path from "node:path";

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

app.post("/", async function (request: Request, response: Response) {
  const up = upload.single("file");
  up(request, response, async function (err) {
    if (err instanceof multer.MulterError) {
      response.status(400).json({
        error: true,
        message: err,
      });
      return;
    }
    if (!request.file) {
      response.status(400).send({
        error: true,
        message: "No file received",
      });
      return;
    }

    await Readable.toWeb(createReadStream(request.file?.path))
      .pipeThrough(Transform.toWeb(csvToJson()))
      .pipeThrough(
        new TransformStream({
          async transform(jsonLine, controller) {
            const data = JSON.parse(Buffer.from(jsonLine));
            const mappedData = JSON.stringify({
              nrCpfCnpj: data.nrCpfCnpj,
            });
            controller.enqueue(mappedData.concat("\n"));
          },
        }),
      )
      .pipeTo(Writable.toWeb(response));
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));