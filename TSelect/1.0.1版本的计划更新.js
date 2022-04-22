(() => {
    const limit = e.values.split('~');
    limit[2] = limit[0] = +limit[0];
    limit[1] = +limit[1].split('+=')[0];
    if (limit[0] > limit[1]) {
        limit[0] = limit[1] - limit[0];
        limit[1] = limit[1] - limit[0];
        limit[0] = limit[0] + limit[1];
    }
    const plus = +e.values.split('+=')[1].split('%')[0];
    const number = e.values.split('==');
    number[0] = +number[0].split('%')[1];
    number[1] = +number[1];
    e.values = [];
    for (let i = limit[2]; i >= limit[0] && i <= limit[1]; i += plus) {
        if (i % number[0] == number[1]) {
            e.values.push(i);
        }
    }
})()