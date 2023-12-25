export const viewDate = (datetime, year = false) => {
    const months = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const date = new Date(datetime);
    // date.setFullYear(2023); // Set year to 2023
    // date.setMonth(11); // Set month to December (0-based)
    // date.setDate(20); // Set day of the month to 20
    // date.setHours(12); // Set hours to 12 (12:00 PM)
    // date.setMinutes(30); // Set minutes to 30

    const monthAbbreviation = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedDate = `${monthAbbreviation} ${day} ${year ? date.getUTCFullYear() : ""} - ${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedDate;

}

export const setDateInpValue = (datetime) => {
    const date = new Date(datetime); // Create a Date object from the provided datetime string
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it starts from 0
    const day = (date.getDate()).toString().padStart(2, '0'); // Getting day of the month
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}


export const setTimeInpValue = (datetime) => {
    const date = new Date(datetime);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
}
