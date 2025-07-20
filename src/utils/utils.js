function truncateWords(str, numWords=20) {
    return str.split(' ').slice(0, numWords).join(' ') + '...';
}


export {truncateWords};
