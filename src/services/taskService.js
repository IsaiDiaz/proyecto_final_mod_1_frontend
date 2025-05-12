import apiPrivate from "./apiPrivate";

export const createTask = async (taskData) => {
    const response = await apiPrivate.post('/task', taskData);
    return response.data;
}

export const getTodayTasksByUserId = async (status = '', query = '') => {
    const response = await apiPrivate.get(`/tasks/today`, {
        params: { status, query }
    });
    return response.data;
}

export const getTasksByUserId = async (status = '', query = '') => {
    const response = await apiPrivate.get(`/tasks`, {
        params: { status, query }
    });
    return response.data;
};

export const updateTask = async (taskId, taskData) => {
    const response = await apiPrivate.put(`/task/${taskId}`, taskData);
    return response.data;
}

export const updateProgress = async (taskId) => {
    const response = await apiPrivate.put(`/task/${taskId}/progress`);
    return response.data;
}

export const deleteTask = async (taskId) => {
    const response = await apiPrivate.delete(`/task/${taskId}`);
    return response.data;
}