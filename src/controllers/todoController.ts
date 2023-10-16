import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const todos = async (req: Request, res: Response) => {
    const todoList = await Todo.findAll();

    res.json({todoList});
}

export const createTodo = async (req: Request, res: Response) => {
    if(req.body.title) {
        let newTodo = await Todo.create({ 
            title: req.body.title,
            done: req.body.done ? true: false 
        });
        
        res.status(201).json({response: `Criado com sucesso: ${newTodo}`});
    } else {
        res.json({error: "Dados não enviados."})
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    
    let todo = await Todo.findByPk(id);
    if ( todo ) {
        if( req.body.title ) {
            todo.title = req.body.title;
        }
    
        if ( req.body.done ) {
            todo.done ? true : false;
        }

        await todo.save()
        res.json({item: todo});
    } else {
        res.json({ error: 'ToDo not found'})
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    let todo = await Todo.findByPk(id);
    if ( todo ) {
        await todo.destroy();
        res.json({success: 'Item removido com sucesso.'})
    } else {
        res.json({error: 'ID não enviado'})
    }
}