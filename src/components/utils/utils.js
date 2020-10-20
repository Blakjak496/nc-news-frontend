const formatDate = (str) => {
    const date = new Date(str);
    let day = date.getDay();
    let month = date.getMonth();
    let monthDay = date.getUTCDate();
    let year = date.getUTCFullYear();

    switch(day) {
      case 0:
        day = 'Sun';
        break;
      case 1:
        day = 'Mon';
        break;
      case 2:
        day= 'Tues';
        break;
      case 3:
        day = 'Wed';
        break;
      case 4:
        day = 'Thurs';
        break;
      case 5:
        day = 'Fri';
        break;
      case 6:
        day = 'Sat';
        break;
      default:
        break;
    }

    switch(month) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month= 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
      default:
        break;
    }

    switch(monthDay) {
      case monthDay < 5:
        if (monthDay === 1) monthDay = `${monthDay}st`;
        if (monthDay === 2) monthDay = `${monthDay}nd`;
        if (monthDay === 3) monthDay = `${monthDay}rd`;
        break;
      case monthDay > 20:
        const lastNum = parseInt(monthDay.toString().split('').pop());
        if (lastNum === 1) monthDay = `${monthDay}st`;
        if (lastNum === 2) monthDay = `${monthDay}nd`;
        if (lastNum === 3) monthDay = `${monthDay}rd`;
        break;
      default:
        monthDay = `${monthDay}th`;
        break;
    }

    const formattedDate = `${day} ${monthDay} ${month} ${year}, ${date.getUTCHours() > 10 ? date.getUTCHours() : '0'+ date.getUTCHours()}:${date.getUTCMinutes() > 10 ? date.getUTCMinutes() : '0'+ date.getUTCMinutes()}`;
    return formattedDate;
}

export default formatDate;