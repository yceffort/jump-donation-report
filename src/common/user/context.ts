import { createContext } from 'react';
import { UserState, initialState } from './reducer';

const UserContext = createContext<UserState>(initialState);

export default UserContext;
