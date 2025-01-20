import { FastifyInstance } from 'fastify'

import { SourceRecord, SourceData } from '@prisma/client'

import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { ApiError } from '../errors'
import { IEntityId, ISourceRecordId } from './schemas/common'

async function sourceRoutes(app: FastifyInstance) {
    app.setReplySerializer(serializer)
  
    const log = app.log.child({ component: 'sourceRoutes' })

    // ENDPOINT 3: create source record from source data
    app.post<{
        Body: { formId: string, sourceData: {question: string, answer: string }[] }
        Reply: SourceRecord
    }>('/', {
        async handler(req, reply) {
        const { formId, sourceData } = req.body;
        try {
            const sourceRecord = await prisma.sourceRecord.create({
            data: {
                formId,
                sourceData: {
                create: sourceData.map((item) => ({
                question: item.question,
                answer: item.answer
              })),
            },
          }
        });
          reply.code(200).send(sourceRecord);
        } catch (err: any) {
          log.error({ err }, err.message)
          throw new ApiError('failed to create sourceRecord', 400)
        }
      }
    })

    // ENDPOINT 5: get source record from form id
    app.get<{
      Reply: SourceRecord[]
    }>('/', {
      async handler(req, reply) {
        log.debug('get source records by id')
        try {
          const records = await prisma.sourceRecord.findMany()
          reply.send(records)
        } catch (err: any) {
          log.error({ err }, err.message)
          throw new ApiError('failed to fetch records', 400)
        }
      },
    });

    app.get<{
      Params: ISourceRecordId
      Reply: SourceData[]
    }>('/:sourceRecordId', {
      async handler(req, reply) {
        const { params } = req
        const  { sourceRecordId } = params
        log.debug('get source data by record id')
        try {
          const datas = await prisma.sourceData.findMany({ where: { sourceRecordId } })
          reply.send(datas)
        } catch (err: any) {
          log.error({ err }, err.message)
          throw new ApiError('failed to fetch source data', 400)
        }
      }
    })
}

export default sourceRoutes;