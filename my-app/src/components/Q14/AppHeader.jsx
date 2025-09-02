import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth.actions.js';
import { resetQuiz } from '../redux/quiz.actions.js';

export function AppHeader() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetQuiz());
    };

    if (!isAuthenticated) return null;

    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-10">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="text-xl font-bold text-cyan-400">Quiz Master</div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}