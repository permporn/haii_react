export function formatDate(dt,tim) {
    const date = new Date(dt);
    const time = new Date(tim);
    const mon = ("0" + (date.getMonth() + 1)).slice(-2);
    const dat = ("0" + date.getDate()).slice(-2);
    const hr = ("0" + time.getHours()).slice(-2);
    const min = ("0" + time.getMinutes()).slice(-2);
    return `${date.getFullYear()}-${mon}-${dat}T${hr}:${min}`;
}
