export default (org, road) => {
    if (!org || !road) {
        return org;
    }
    let orgList = org.split(' ');
    let roadList = road.split(' ');
    let i = 0;
    while (i < orgList.length && i < roadList.length) {
        if (orgList[i] !== roadList[i]) {
            break;
        }
        i++;
    }

    orgList = orgList.slice(i);

    return orgList.join(' ');
};