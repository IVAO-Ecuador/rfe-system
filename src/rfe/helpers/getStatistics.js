export const getStatistics = async () => {
    const URL = 'http://localhost:2020/api/statistics'
    return fetch(URL).then(resp => resp.json())
    .then(resp => {
        return resp;
    });
}