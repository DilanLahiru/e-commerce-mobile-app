import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


interface UserState {
    user: {id: string, name: string, email: string, role: string} | null;
    token: string | null;
    loading: boolean;
    error: string | null
}

const initialState: UserState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// Register User
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: { name: string; email: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post('http://192.168.1.6:5000/api/auth/register', userData);
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Registration failed');
        }
    }
);

// Login User
export const loginUser = createAsyncThunk(
    'user/login',
    async (userData: {email: string, password: string}, thunkAPI) => {
        try {
            const response = await axios.post('http://192.168.1.6:5000/api/auth/login', userData);
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            const token = response.data.token;
            // Save token to storage
            await AsyncStorage.setItem("authToken", token);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Registration failed');
        }
    }
)

// Auto-load token on app launch
export const loadToken = createAsyncThunk('user/loadToken', async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        console.log('====================================');
        console.log(token);
        console.log('====================================');
        return token; // Returns the token or null if it doesn't exist
    } catch (error) {
        console.error('Failed to load token from storage', error);
        return null; // Return null if there's an error
    }
});


// Logout User

export const logoutUser = createAsyncThunk('user/logout', async (_,thunkAPI) => {
    try {
        await AsyncStorage.removeItem('authToken'); // Remove token from storage
        return null; // Returning null to reset token in state
    } catch (error) {
        console.error('Failed to logout', error);
        return thunkAPI.rejectWithValue('Logout failed');
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            AsyncStorage.removeItem('authToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
            })
            // Handle token loading
            .addCase(loadToken.fulfilled, (state, action) => {
            state.token = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.token = action.payload;
            })
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;