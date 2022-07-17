import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Iuser } from '@interface/reduxStore';

export interface IprofileState {
  statusLogin?: boolean;
  user?: Iuser | null;
  token?: string;
  remember: boolean;
}

const initialState: IprofileState = {
  statusLogin: false,
  user: null,
  token: '',
  remember: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile: (state: IprofileState, action: PayloadAction<IprofileState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addProfile } = profileSlice.actions;
export default profileSlice.reducer;
