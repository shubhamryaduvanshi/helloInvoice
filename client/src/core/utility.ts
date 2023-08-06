export const formatMobileNumber = (number: string) => {
    if (!number) return;
    const cleaned = number.replace(/\D/g, '');
    return cleaned.replace(/^(\d{4})(\d{3})(\d{3})$/, '$1-$2-$3');
}

export const formateDate = (currentDate: Date) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
}


export const getFormattedAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount)
}

export const print = (elementId: string) => {
    window.print();
}