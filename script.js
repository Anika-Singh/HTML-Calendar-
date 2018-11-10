

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function calendar(date) {
  // If no parameter is passed use the current date.
  if(date == null)
     date = new Date();

  day = date.getDate();
  month = date.getMonth();
  year = date.getFullYear();

  months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

  this_month = new Date(year, month, 1);

  // Find out when this month starts and ends.
  first_week_day = this_month.getDay();
  days_in_this_month = daysInMonth(month+1, year); 

  calendar_html = '<div class="calendar_wrap" >';
  calendar_html += '<div>';
  calendar_html += '<select name="year" onchange="onMonthYearChange()" id="year"><option value="">Select Year</option></select>';  
  calendar_html += '<select name="month" onchange="onMonthYearChange()" id="month"><option value="">Select Month</option></select>' ;
  calendar_html += '</div>';
  
  calendar_html += '<div class="calendar">';
  calendar_html += '<div> SUN </div>';
  calendar_html += '<div> MON </div>';
  calendar_html += '<div> TUE </div>';
  calendar_html += '<div> WED </div>';
  calendar_html += '<div> THU </div>';
  calendar_html += '<div> FRI </div>';
  calendar_html += '<div> SAT </div>';
  
  // Fill the first week of the month with the appropriate number of blanks.
  for(week_day = 0; week_day < first_week_day; week_day++) {
    calendar_html += '<div class="design"> </div>';
  }

  week_day = first_week_day;
  for(day_counter = 1; day_counter <= days_in_this_month; day_counter++) {
    week_day %= 7;

    // Do something different for the current day.
    if(day == day_counter)
      calendar_html += '<div class="design" style="background-color:green"><b>' + day_counter + '</b></div>';
    else
      calendar_html += '<div class="design">' + day_counter + ' </div>';

    week_day++;
  }

 calendar_html += '</div>';
 calendar_html += '</div>';

  return calendar_html;
}

function selectCell(e)
{
	var classname = document.getElementsByClassName("design");
	for (var i = 0; i < classname.length; i++) {
		classname[i].style.backgroundColor = 'lightblue';
	}
	e.target.style.backgroundColor = 'green';
}

function mouseOverCell(e)
{
	var classname = document.getElementsByClassName("design");
	for (var i = 0; i < classname.length; i++) {
	   if ( classname[i].style.backgroundColor != 'green')
		classname[i].style.backgroundColor = 'lightblue';
	}
	if ( e.target.style.backgroundColor != 'green')
		e.target.style.backgroundColor = 'lightgreen';
}

function populateYears(year)
{
    if ( year == null )
	{
      date = new Date();
	  year = date.getFullYear();
	}
	
	for(y = 1900; y <= 2018; y++) {
		var optn = document.createElement("OPTION");
		optn.text = y;
		optn.value = y;
		
		if (y == year) {
			optn.selected = true;
		}
		
		document.getElementById('year').options.add(optn);
	}
}

function populateMonths(month)
{
	if ( month == null )
	{
      var date = new Date();
	  month = date.getMonth();
	}
	
	var monthArray = new Array();
	monthArray[0] = "January";
	monthArray[1] = "February";
	monthArray[2] = "March";
	monthArray[3] = "April";
	monthArray[4] = "May";
	monthArray[5] = "June";
	monthArray[6] = "July";
	monthArray[7] = "August";
	monthArray[8] = "September";
	monthArray[9] = "October";
	monthArray[10] = "November";
	monthArray[11] = "December";
	for(m = 0; m <= 11; m++) {
		var optn = document.createElement("OPTION");
		optn.text = monthArray[m];
		// server side month start from one
		optn.value = (m);

		// if june selected
		if ( m == month) {
			optn.selected = true;
		}

		document.getElementById('month').options.add(optn);
	}
}

function onMonthYearChange(e)
{
	var month = document.getElementById('month').value;
	var year = document.getElementById('year').value;
	date = new Date(year, month, 1);
	
	document.getElementById('monthDIV').innerHTML = calendar(date);	
	populateYears(year);
	populateMonths(month);
	attachEvents();	
}

function attachEvents()
{
	var classname = document.getElementsByClassName("design");
	for (var i = 0; i < classname.length; i++) {
		classname[i].addEventListener('click', selectCell, false);
		classname[i].addEventListener('mouseover', mouseOverCell, false);		
	}
}

