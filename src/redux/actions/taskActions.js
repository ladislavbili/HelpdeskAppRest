export function updateTask(taskId, data) {
    let config = {
        method: 'PATCH',
        body: queryString.stringify(data),
        headers: {
            'Authorization': 'Bearer ' + getFromStorage(TOKEN_KEY),
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return fetch(TASK_LIST + '/' + taskId, config)
        .then(response =>
            response.json().then(tasks => ({tasks, response}))
        ).then(({tasks, response}) => {
            if (!response.ok) {
                return Promise.reject(buildError(response, tasks))
            } else {
                return Promise.resolve(tasks);
            }
        });
}
