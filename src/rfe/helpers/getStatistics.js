export const getStatistics = async () => {
    const URL = 'https://api.ec.ivao.aero/api/rfo/statistics'
    return fetch(URL).then(resp => resp.json())
        .then(resp => {
            return resp;
        });
}