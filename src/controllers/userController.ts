import { Request, Response } from 'express';

import { getUserById, createUser as saveUser } from '../services/userServices';

export const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log('getiinggggggg')
        const user = await getUserById(id);
        if (user) {
          res.json(user);
        } else {
            console.log('error in getting ser')
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: error.message });
      }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        console.log("hereeeeeee", user)
        const newUser = await saveUser(user);
        res.status(201).json(newUser);
      } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: error.message });
      }
};
