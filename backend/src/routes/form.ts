import { FastifyInstance } from 'fastify'

import { Form } from '@prisma/client'

import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { IEntityId } from './schemas/common'
import { ApiError } from '../errors'

async function formRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)

  const log = app.log.child({ component: 'formRoutes' })

  // ENDPOINT 1: create form
  app.post<{Body: Omit<Form, 'id'>; Reply: Form }>('/', {
    async handler(req, reply) {
      const { name, fields } = req.body;

      if (!name || typeof fields !== 'object' || fields == null) {
        throw new ApiError("Invalid form data: `name` and `fields` are required", 400);
      }
      try {
        const newForm = await prisma.form.create({
          data: {name, fields },
        });
        reply.code(200).send(newForm);
      } catch (err: any) {
        log.error({ err }, err.message);
        throw new ApiError("failed to create form", 400)
      }
    },
  });

  // ENDPOINT 2: get form by id
  app.get<{
    Params: IEntityId
    Reply: Form
  }>('/:id', {
    async handler(req, reply) {
      const { params } = req
      const { id } = params
      log.debug('get form by id')
      try {
        const form = await prisma.form.findUniqueOrThrow({ where: { id } })
        reply.send(form)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch form', 400)
      }
    },
  });

  // ENDPOINT 3: get all forms
  app.get<{
    Reply: Form[]
  }>('/', {
    async handler(req, reply) {
      log.debug('get all forms')
      try {
        const forms = await prisma.form.findMany()
        reply.send(forms)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch forms', 400)
      }
    },
  });
}

export default formRoutes
