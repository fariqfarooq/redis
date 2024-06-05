import { createClient } from 'redis';

import User from '../models/userModel';


const client = createClient();

client.on('error', (err) => {
  console.error('Redis client error:', err);
});

client.connect(); // Connect the client



export const getUserById = async (id: string): Promise<any> => {
  try {
    console.log('im heree')
    const reply = await client.get(id);
    console.log('reply', reply)
    if (reply) {
        console.log('reply', reply)
      return JSON.parse(reply);
    } else {
        console.log('hheheheh')
      const user = await User.findById({_id : id});
      console.log('USER', user)
      if (user) {
        await client.set(id, JSON.stringify(user), { EX: 3600 }); // Cache for 1 hour
      }
      return user;
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const createUser = async (user: any): Promise<any> => {
  const newUser = new User(user);
  await newUser.save();
  return newUser;
};
