import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { ITodo } from '../types/todo'
import { TodoRepoImpl } from './../repo/todo-repo'

const TodoRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    const todoRepo = TodoRepoImpl.of()

    interface IdParam {
        id: string
    }

    // TODO: Add CRUD endpoints, i.e. get, post, update, delete
    // NOTE: the url should be RESTful
    server.get('/todos', opts, async (request, reply) => {
        try {
            const todos: Array<ITodo> = await todoRepo.getTodos()
            return reply.status(200).send({ todos})
        } catch (error) {
            console.error('GET /todos Error: ${error}')
        }
    })

    server.post('/todos', opts, async (request, reply) => {
        try {
            const todoBody: ITodo = request.body as ITodo
            const todo: ITodo = await todoRepo.addTodo(todoBody)
            return reply.status(200).send({ todo })
        } catch (error) {
            console.error('GET /todos Error: ${error}')
        }
    })

    // server.update('/todos', opts, async (request, reply) => {
    //     try {
    //         const todos: Array<ITodo> = await todoRepo.getTodos()
    //         return reply.status(200).send({ todos})
    //     } catch (error) {
    //         console.error('GET /todos Error: ${error}')
    //     }
    // })

    // server.delete('/todos', opts, async (request, reply) => {
    //     try {
    //         const todos: Array<ITodo> = await todoRepo.getTodos()
    //         return reply.status(200).send({ todos})
    //     } catch (error) {
    //         console.error('GET /todos Error: ${error}')
    //     }
    // })

    done()
}

export { TodoRouter }
