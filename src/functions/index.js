export const formatNumber = (num) => {
    return parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        .replace('.', ',');
}

export const currency = '€';