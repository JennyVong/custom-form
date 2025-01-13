import { FastifyInstance } from 'fastify'

import { SourceRecord } from '@prisma/client'

import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { ApiError } from '../errors'

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
}

export default sourceRoutes;